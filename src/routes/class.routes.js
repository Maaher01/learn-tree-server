const classController = require("../controllers/class.controller");

const { Router } = require("express");

const router = Router();

router.post("/create-class", classController.createClassHandler);

module.exports = router;
