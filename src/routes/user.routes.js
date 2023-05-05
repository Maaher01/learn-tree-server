const { Router } = require("express");
const {
	userInfoHandler,
	userQuestionBankHandler,
} = require("../controllers/user.controller");

const router = Router();

router.post("/", userInfoHandler);
router.post("/questionbank");

module.exports = router;
