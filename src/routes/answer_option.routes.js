const answerOptionController = require("../controllers/answer_option.controller");
const checkRoleAuth = require("../middleware/check-role-auth");

const Router = require("express");

const router = Router();

router.post(
	"/create-answer-option",
	checkRoleAuth("Teacher"),
	answerOptionController.answerOptionCreate
);
router.get(
	"/get-answer-options/:question_id",
	checkRoleAuth("Teacher"),
	answerOptionController.answerOptonsByQuestionGet
);

module.exports = router;
