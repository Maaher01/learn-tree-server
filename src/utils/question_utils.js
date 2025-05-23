const { pool } = require("../config/dbConnection");

const createQuestion = async (
	class_id,
	subject_id,
	question_text,
	full_marks
) => {
	const { rows } = await pool.query(
		"INSERT INTO questions (class_id, subject_id, question_text, full_marks) VALUES ($1, $2, $3, $4) RETURNING *;",
		[class_id, subject_id, question_text, full_marks]
	);
	if (rows) {
		return rows[0];
	}
	return null;
};

module.exports = {
	createQuestion,
};
