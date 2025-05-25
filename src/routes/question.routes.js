const questionController = require("../controllers/question.controller");
const checkAdminAuth = require("../middleware/check-admin-auth");

const Router = require("express");

const router = Router();

router.post(
  "/create-question",
  checkAdminAuth,
  questionController.questionCreate
);
router.get(
  "/get-all-questions-by-class-subject/:class_id/:subject_id",
  checkAdminAuth,
  questionController.getAllQuestionAndAnswersByClassAndSubject
);

module.exports = router;
