const bcrypt = require("bcryptjs");
const Client = require("../models/clientModel");

const addClient = async (req, res) => {
  const { name, address, phone, notes } = req.body;
  console.log("ooooo", req.body);
  if (!name) return res.status(400).json("من فضلك ادخل جيمع البيانات");
  try {
    let tmp = await Client.find({ name: name });
    if (tmp.length != 0) {
      tmp = tmp[0];
    } else {
      tmp = await Client.create({
        name,
        address,
        phone,
        notes,
      });
    }
    // console.log("xxxxx");
    return res.status(200).json(tmp._id);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
const getAll = async (req, res) => {
  let page = req.query.page;
  let start = page ? (page - 1) * 10 : 0;
  // let limit = page ? page * 10 : 10;
  try {
    let result = await Client.find({}).sort({createdAt:-1}).skip(start).limit(10);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};
const search = async (req, res) => {
  const { name } = req.body;
  let page = req.query.page;
  let start = page ? (page - 1) * 10 : 0;
  try {
    let result = [];
    if (name && name.trim().length != 0)
      result = await Client.find({ name: name });
    else {
      result = await Client.find({}).skip(start).limit(10);
    }
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const deteleClient = async (req, res) => {
  let id = req.params.id;
  try {
    await Client.findByIdAndDelete(id);
    return res.status(200).json("تم الحذف");
  } catch (error) {
    console.log(error);
    return res.status(500).json("خطأ في السيرفر");
  }
};

const editClient = async (req, res) => {
  let { id, name, address, phone, notes } = req.body;
  console.log(req.body)
  if (!id) {
    return res.status(400).json("خطا في ادخال البيانات");
  }
  try {
    let user = await Client.findById(id);
    await Client.findByIdAndUpdate(id, {
      name: name || user.name,
      phone: phone || user.phone,
      address: address || user.address,
      notes: notes || user.notes,
    });
    return res.status(200).json('تم التعديل')
  } catch (error) {
    console.log(error);
    return res.status(500).json("خطأ في السيرفر");
  }
};
module.exports = { addClient, getAll, search, deteleClient, editClient };
