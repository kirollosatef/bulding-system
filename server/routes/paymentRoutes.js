const router = require("express").Router();
const {
  addPayment,
  getPayment,
  searchPayment,
  search,
} = require("../controllers/paymentController");
const check = require("../guard/guard");

router.post("/add", check.validation, addPayment);
router.post("/search", check.validation, search);
router.get("/", check.validation, getPayment);

module.exports = router;
