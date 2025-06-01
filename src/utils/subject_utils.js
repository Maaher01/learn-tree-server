const { pool } = require("../config/dbConnection");

const createSubject = async (subject_name, class_id) => {
	const { rows } = await pool.query(
		"INSERT INTO subjects (subject_name, class_id) VALUES ($1, $2) RETURNING *;",
		[subject_name, class_id]
	);
	if (rows) {
		return rows[0];
	}
	return null;
};

const getSubjectDetails = async (class_id, subject_id) => {
	const { rows } = await pool.query(
		`SELECT s.subject_name, c.class_name
		FROM subjects s
		JOIN classes c ON s.class_id = c.class_id
		WHERE c.class_id=$1 AND s.subject_id=$2;`,
		[class_id, subject_id]
	);
	if (rows) {
		return rows[0];
	}
	return null;
};

const deleteSubject = async (subject_id) => {
	const { rows } = await pool.query(
		"DELETE FROM subjects WHERE subject_id=$1 RETURNING *;",
		[subject_id]
	);
	if (rows) {
		return rows[0];
	}
	return null;
};

module.exports = {
	createSubject,
	getSubjectDetails,
	deleteSubject,
};
