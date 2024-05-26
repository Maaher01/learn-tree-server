const { Router } = require("express");

const userController = require("../controllers/user.controller");

const router = Router();

router.get("/userinfo", userController.userInfoHandler);
router.get("/questionbank", userController.userQuestionBankHandler);

module.exports = router;
