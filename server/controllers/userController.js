const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const signIn = async (req, res) => {
  const { name, password } = req.body;
  console.log(name, password);
  if (!name || !password) return res.status(400).json("ادخل جميع البيانات المطلوبه");
  try {
    let tmp = await User.find({ name: name });
    let user = await User.find({ name: name }, { password: false });
    if (tmp.length == 0) {
      return res.status(400).json("الرقم السري او اسم المستخدم خطأ");
    }
    bcrypt.compare(password, tmp[0].password).then(async (same) => {
      if (!same) {
        return res.status(400).json("الباسورد خطأ");
      }
      const token = jwt.sign(user[0].toJSON(), "HS256", {
        expiresIn: "24h",
      });
      res.status(200).json({ token: token });
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};
const signUp = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) return res.status(400).json("ادخل جميع البيانات المطلوبه");
  try {
    let tmp = await User.find({ name: name });
    if (tmp.length != 0) {
      return res.status(400).json("الاسم مستخدم بالفعل");
    }
    bcrypt.hash(password, 10).then(async (hashed) => {
      tmp = await User.create({
        name,
        password: hashed,
      });
    });
    return res.status(200).json("تم التسجيل");
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = { signIn, signUp };
