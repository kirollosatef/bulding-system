const router = require("express").Router();
const {
  addNew,
  notifications,
  extend,
  extendPeriod,
  getContractInfo,
  getBuildings,
  deleteRent,
  search,
  getById,
} = require("../controllers/rentController");
const check = require("../guard/guard");
router.post("/add", check.validation, addNew);
router.get("/notifications", check.validation, notifications);
router.post("/extendPeriod", check.validation, extendPeriod);
router.post("/extend", check.validation, extend);
router.post("/contractInfo", check.validation, getContractInfo);
router.post("/search", check.validation, search);
router.get("/buildings", check.validation, getBuildings);
router.get('/:id',getById)
router.delete("/:id/:buildId", check.validation, deleteRent);
module.exports = router;
