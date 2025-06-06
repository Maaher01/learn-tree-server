const {
  createAnswerOption,
  getAnswerOptionsByQuestion,
} = require("../utils/answer_option_utils");

exports.answerOptionCreate = async (req, res, next) => {
  const { question_id, option_text, is_correct } = req.body;

  try {
    const newAnswerOption = await createAnswerOption(
      question_id,
      option_text,
      is_correct
    );

    res.status(200).json({
      status: "Success",
      data: newAnswerOption,
      message: "Answer option created successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = "Something went wrong in the database operation";
    }
    next(err);
  }
};

exports.answerOptonsByQuestionGet = async (req, res, next) => {
  const { question_id } = req.params;

  try {
    const answerOptions = await getAnswerOptionsByQuestion(question_id);

    res.status(200).json({
      status: "Success",
      data: answerOptions,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = "Something went wrong in the database operation";
    }
    next(err);
  }
};
