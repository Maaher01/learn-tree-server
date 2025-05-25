const answerOptionController = require("../controllers/answer_option.controller");
const checkAdminAuth = require("../middleware/check-admin-auth");

const Router = require("express");

const router = Router();

router.post(
  "/create-answer-option",
  checkAdminAuth,
  answerOptionController.answerOptionCreate
);
router.get(
  "/get-answer-options/:question_id",
  checkAdminAuth,
  answerOptionController.answerOptonsByQuestionGet
);

module.exports = router;
