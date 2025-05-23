const { createQuestion } = require("../utils/question_utils");

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
