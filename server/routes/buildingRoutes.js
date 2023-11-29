const router = require("express").Router();
const {
  addBuild,
  getAll,
  searchBuilding,
  getEmpty,
  getNotEmpty,
  deletBuilding,
  editBuilding,
} = require("../controllers/buildingController");
const check = require("../guard/guard");
router.post("/add", check.validation, addBuild);
router.get("/", check.validation, getAll);
router.get("/available", check.validation, getEmpty);
router.get("/notavailable", check.validation, getNotEmpty);
router.post("/search", check.validation, searchBuilding);
router.delete("/:id", check.validation, deletBuilding);
router.patch("/:id", check.validation, editBuilding);
module.exports = router;
