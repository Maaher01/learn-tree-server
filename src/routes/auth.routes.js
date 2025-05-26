const authController = require("../controllers/auth.controller");
const userInputValidator = require("../validation/user");

const { Router } = require("express");

const router = Router();

router.post(
	"/register",
	userInputValidator.checkUserRegInput,
	authController.userRegistration
);
router.post("/login", authController.userLogin);
router.post("/logout", authController.userLogout);
router.get("/refreshtoken", authController.userRefreshToken);

module.exports = router;
