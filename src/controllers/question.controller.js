const { getAnswerOptionsByQuestion } = require("../utils/answer_option_utils");
const {
  createQuestion,
  getAllQuestionsByClassAndSubject,
} = require("../utils/question_utils");

exports.questionCreate = async (req, res, next) => {
  const { class_id, subject_id, question_text, full_marks } = req.body;

  try {
    const newQuestion = await createQuestion(
      class_id,
      subject_id,
      question_text,
      full_marks
    );

    res.status(200).json({
      status: "Success",
      data: newQuestion,
      message: "Question created successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = "Something went wrong in the database operation";
    }
    next(err);
  }
};

exports.getAllQuestionAndAnswersByClassAndSubject = async (req, res, next) => {
  const { class_id, subject_id } = req.params;

  try {
    const questions = await getAllQuestionsByClassAndSubject(
      class_id,
      subject_id
    );

    const questionsWithAnswers = await Promise.all(
      questions.map(async (question) => {
        const options = await getAnswerOptionsByQuestion(question.question_id);
        return {
          ...question,
          options,
        };
      })
    );

    res.status(200).json({
      status: "Success",
      data: questionsWithAnswers,
      message: "Successfully fetched all questions",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = "Something went wrong in the datbase operation";
    }
    next(err);
  }
};
