const { signIn, signUp } = require("../controllers/userController");

const router = require("express").Router();
const check = require("../guard/guard");
router.post("/signin", signIn);
router.post("/signup", signUp);
module.exports = router;
