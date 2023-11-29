const Payment = require("../models/paymentModel");

const addPayment = async (req, res) => {
  const { clientId, amount } = req.body;
  if (!clientId || !amount) return res.status(400).json("البيانات غير صحيحه");
  try {
    await Payment.create({
      client: clientId,
      amount,
    });
    return res.status(200).json("تم الايداع");
  } catch (error) {
    return res.status(400).json(error);
  }
};

const searchPayment = async (req, res) => {
  const { clientName, contractNumber } = req.body;
  let page = req.query.page ? req.query.page * 1 - 1 : 0;
  if (!clientName || !contractNumber)
    return res.status(400).json("البيانات غير كامله");
  try {
    let data = await Payment.find({})
      .populate("rent")
      .skip(page * 20)
      .limit(20);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const getPayment = async (req, res) => {
  let page = req.query.page ? req.query.page * 1 - 1 : 0;

  try {
    let data = await Payment.find({})
      .populate("rent")
      .skip(page * 20)
      .sort({ createdAt: -1 })
      .limit(20);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const search = async (req, res) => {
  let { name, number } = req.body;
  let page = req.query.page ? req.query.page : 1;
  try {
    let result = [];
    if (name && name.length != 0 && number && number.length != 0) {
      result = await Payment.find({
        $or: [
          { clientName: { $regex: name } },
          { contractNumber: { $regex: number } },
        ],
      })
        .skip((page - 1) * 1)
        .limit(1);
    } else if (name && name.length != 0) {
      result = await Payment.find({
        clientName: { $regex: name },
      })
        .skip((page - 1) * 1)
        .limit(1);
    } else if(number){
      result = await Payment.find({ contractNumber: { $regex: number } })
        .skip((page - 1) * 1)
        .limit(1);
    }
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json("خطأ في السيرفر");
  }
};
module.exports = { addPayment, getPayment, searchPayment, search };
