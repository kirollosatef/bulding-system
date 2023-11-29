const Rent = require("../models/rentModel");
const Building = require("../models/buildingModel");
const Client = require("../models/clientModel");
const Payment = require("../models/paymentModel");
const { default: mongoose } = require("mongoose");
const addNew = async (req, res) => {
  const {
    clientId,
    buildId,
    period,
    type,
    purpose,
    amount,
    from,
    to,
    price,
    timeToPay,
  } = req.body;
  if (
    !from ||
    !to ||
    !price ||
    !type ||
    !period ||
    !buildId ||
    !timeToPay ||
    !amount ||
    !purpose
  )
    return res.status(400).json("من فضلك ادخل جميع البيانات");
  try {
    let rentTime = new Date(
      new Date().getTime() + timeToPay * 30 * 24 * 60 * 60 * 1000
    );
    let contractNumber = await Rent.findOne({})
      .sort({ contractNumber: -1 })
      .limit(1);
    if (!contractNumber) {
      contractNumber = 1024;
    } else {
      contractNumber = contractNumber.contractNumber + 1;
    }
    await Rent.create({
      client: clientId,
      building: buildId,
      type,
      period,
      from,
      to,
      purpose,
      amount,
      timeToPay,
      rentTime,
      contractNumber,
    });
    await Building.findByIdAndUpdate(buildId, { empty: false });
    return res.status(200).json("تم الاحاله");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
const getBuildings = async (req, res) => {
  let page = req.query.page ? req.query.page - 1 : 0;
  try {
    let result = await Rent.find({})
      .skip(page * 20)
      .populate("client")
      .populate("building")
      .sort({ createdAt: -1 })
      .limit(20);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
const notifications = async (req, res) => {
  let page = 0  ;
  try {
    const cutoffDate = new Date();
    console.log(cutoffDate);
    
    let result = await Rent.find({rentTime: { $lt: new Date()  } })
      .skip(page * 20)
      .populate("client")
      .populate("building")
      .limit(20);
    
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
const extendPeriod = async (req, res) => {
  const { rentId } = req.body;
  if (!rentId) return res.status(400).json("خطأ في ادخال البيانات");
  try {
    let rent = await Rent.findById(rentId)
      .populate("client")
      .populate("building");
    let rentTime = new Date(
      new Date(rent.rentTime).getTime() +
        rent.timeToPay * 30 * 24 * 60 * 60 * 1000
    );
    await Payment.create({
      rent: rent._id,
      clientName: rent.client.name,
      contractNumber: rent.contractNumber,
      buildingNumber: rent.building.number,
      buildingName: rent.building.name,
    });
    await Rent.findByIdAndUpdate(rentId, { rentTime: rentTime });
    return res.status(200).json("تم التمديد");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
const extend = async (req, res) => {
  const { to, rentId } = req.body;
  // console.log('xxxxxxxxx')
  if (!to || !rentId) return res.status(400).json("من فضلك ادخل جميع البيانات");
  try {
    console.log("to", to);
    console.log(to, new Date(to));
    await Rent.findByIdAndUpdate(rentId, { rentTime: new Date(to) });
    return res.status(200).json("تم التمديد");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
const getContractInfo = async (req, res) => {
  const { contractNumber } = req.body;
  if (!contractNumber) return res.status(400).json("البيانات غير كامله");
  try {
    let data = await Rent.find({}).populate("client");
    data = data.filter((item) => item.client.contractNumber == contractNumber);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const deleteRent = async (req, res) => {
  const { id, buildId } = req.params;
  if (!id || !buildId) {
    return res.status(400).json("خطأ في ادخال البيانات");
  }
  try {
    await Building.findByIdAndUpdate(buildId, { empty: true });
    await Rent.findByIdAndDelete(id);
    return res.status(200).json("تم الحذف");
  } catch (error) {
    console.log(error);
    return res.status(400).json("خطأ في السيرفر[");
  }
};

const search = async (req, res) => {
  let number = req.body.number;
  try {
    let result = [];
    await Rent.find({})
      .populate("building")
      .then((data) => {
        data.map((item) => {
          if (
            !number ||
            item.building?.number == number ||
            number.trim().length === 0
          ) {
            if (result.length < 20) result.push(item);
          }
        });
      });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json("خطأ في السيرفر");
  }
};

const getById = async (req, res) => {
  let id = req.params.id;
  console.log(id);
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json("خطأ في ادخال البيانات");
  }
  try {
    let response = await Rent.findById(id)
      .populate("building")
      .populate("client");
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json("خطا في السيرفر");
  }
};
module.exports = {
  addNew,
  notifications,
  extend,
  extendPeriod,
  getContractInfo,
  getBuildings,
  deleteRent,
  search,
  getById,
};
