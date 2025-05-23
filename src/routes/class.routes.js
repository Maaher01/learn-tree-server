const classController = require("../controllers/class.controller");
const checkAdminAuth = require("../middleware/check-admin-auth");

const { Router } = require("express");

const router = Router();

router.post("/create-class", checkAdminAuth, classController.classCreate);

module.exports = router;
