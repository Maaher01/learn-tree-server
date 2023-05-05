const { Router } = require("express");
const {
	registerUserHandler,
	loginUserHandler,
	forgotPasswordHandler,
} = require("../controllers/auth.controller");

const router = Router();

router.post("/register", registerUserHandler);
router.post("/login", loginUserHandler);
router.put("/forgot-password", forgotPasswordHandler);

module.exports = router;
