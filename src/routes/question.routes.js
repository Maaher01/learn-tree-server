const questionController = require("../controllers/question.controller");
const checkRoleAuth = require("../middleware/check-role-auth");

const Router = require("express");

const router = Router();

router.post(
	"/create-question",
	checkRoleAuth("Teacher"),
	questionController.questionCreate
);
router.get(
	"/get-all-questions-by-class-subject/:class_id/:subject_id",
	checkRoleAuth("Teacher"),
	questionController.getAllQuestionAndAnswersByClassAndSubject
);

module.exports = router;
