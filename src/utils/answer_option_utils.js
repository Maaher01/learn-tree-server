const { pool } = require("../config/dbConnection");

const createAnswerOption = async (question_id, option_text, is_correct) => {
	const { rows } = await pool.query(
		"INSERT INTO answer_options (question_id, option_text, is_correct) VALUES ($1, $2, $3) RETURNING *;",
		[question_id, option_text, is_correct]
	);
	if (rows) {
		return rows[0];
	}
	return null;
};

module.exports = {
	createAnswerOption,
};
