const router = require("express").Router();
const { addClient, getAll, search, deteleClient, editClient } = require("../controllers/clientController");
const check = require("../guard/guard");
router.post("/add", check.validation, addClient);
router.get("/", check.validation, getAll);
router.post('/search', check.validation , search)
router.delete('/:id', check.validation, deteleClient)
router.patch('/', check.validation, editClient)
module.exports = router;
