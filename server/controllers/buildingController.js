const Building = require("../models/buildingModel");

const addBuild = async (req, res) => {
  const { name, area, location, number, type, pieceNumber } = req.body;
  if (!name || !number || !type || !pieceNumber || !location || !area)
    return res.status(400).json("من فضلك ادخل جميع البيانات");
  if (
    name == "" ||
    number == "" ||
    type == "" ||
    pieceNumber == "" ||
    location == ""
  )
    return res.status(400).json("من فضلك ادخل جميع البيانات");
  try {
    await Building.create(req.body);
    return res.status(200).json("تم الاضافه");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
const getAll = async (req, res) => {
  let page = req.query.page;
  let start = page ? (page - 1) * 10 : 0;
  try {
    let result = await Building.find({}).skip(start).limit(10);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
const getEmpty = async (req, res) => {
  let page = req.query.page;
  let start = page ? (page - 1) * 10 : 0;
  try {
    let result = await Building.find({ empty: true }).skip(start).limit(20);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
const getNotEmpty = async (req, res) => {
  let page = req.query.page;
  let start = page ? (page - 1) * 10 : 0;
  try {
    let result = await Building.find({ empty: false }).skip(start).limit(10);
    result = result.filter((i) => i.empty == false);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
const searchBuilding = async (req, res) => {
  const { number } = req.body;
  console.log(req.body);
  let page = req.query.page ? req.query.page - 1 : 0;
  try {
    console.log(number.trim().length);
    let result = [];
    if (!number || number.trim().length == 0) {
      result = await Building.find({ empty: true })
        .sort({ createdAt: -1 })
        .skip(page * 20)
        .limit(20);
    } else {
      result = await Building.find({
        $or: [{ number: number }],
        empty: true,
      })
        .sort({ createdAt: -1 })
        .skip(page * 20)
        .limit(20);
    }
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const deletBuilding = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  if (!id) {
    return res.status(400).json("يجب ادخال الرقم التعريقي");
  }
  try {
    await Building.findByIdAndDelete(id);
    return res.status(200).json("تم المسح");
  } catch (error) {
    console.log(error);
    return res.status(400).json("خطأ في السيرفر");
  }
};

const editBuilding = async (req, res) => {
  const { name, area, location, number, type, pieceNumber, buildingId } =
    req.body;
  console.log(req.body);
  if (!buildingId) {
    return res.status(400).json("خطأ في ادخال البيانات");
  }
  try {
    let building = await Building.findById(buildingId);
    await Building.findByIdAndUpdate(buildingId, {
      name: name || building.name,
      area: area || building.area,
      location: location || building.location,
      number: number || building.number,
      type: type || building.type,
      pieceNumber: pieceNumber || building.pieceNumber,
    });
    return res.status(200).json("تم التعديل");
  } catch (error) {
    console.log(error);
    return res.status(400).json("خطأ في السيرفر");
  }
};

module.exports = {
  addBuild,
  getAll,
  searchBuilding,
  getEmpty,
  getNotEmpty,
  deletBuilding,
  editBuilding,
};
