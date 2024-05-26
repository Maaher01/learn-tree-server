const authController = require("../controllers/auth.controller");
const userInputValidator = require("../validation/user");

const { Router } = require("express");

const router = Router();

router.post(
  "/register",
  authController.registerUserHandler,
  userInputValidator.checkUserRegInput
);
router.post("/login", authController.loginUserHandler);
router.put("/forgot-password", authController.forgotPasswordHandler);

module.exports = router;
