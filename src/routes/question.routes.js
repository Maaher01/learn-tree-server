const questionController = require("../controllers/question.controller");
const checkAdminAuth = require("../middleware/check-admin-auth");

const Router = require("express");

const router = Router();

router.post(
	"/create-question",
	checkAdminAuth,
	questionController.questionCreate
);

module.exports = router;
