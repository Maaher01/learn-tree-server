const authController = require("../controllers/auth.controller");
const userInputValidator = require("../validation/user");
const checkUserAuth = require("../middleware/check-user-auth");

const { Router } = require("express");

const router = Router();

router.post(
	"/register",
	authController.registerUserHandler,
	userInputValidator.checkUserRegInput
);
router.get("/login", authController.loginUserHandler);

module.exports = router;
