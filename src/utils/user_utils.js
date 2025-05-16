const { pool } = require("../config/config");

const getUserInfo = async (user_id) => {
	try {
		const { rows } = await pool.query(
			`SELECT 
		c.class_name, 
		s.subject_name 
	FROM 
		users u 
	LEFT JOIN 
		class_enrollment ce ON u.user_id = ce.user_id 
	LEFT JOIN 
		classes c ON ce.class_id = c.class_id 
	LEFT JOIN 
		subject_enrollment se ON u.user_id = se.user_id 
	LEFT JOIN 
		subjects s ON se.subject_id = s.subject_id 
	WHERE 
		u.user_id = $1;`,
			[user_id]
		);
		return rows.length ? rows : null;
	} catch (err) {
		console.error("There was an error fetching user info:", err);
		throw err;
	}
};

const getUserQuestionBank = async (user_id) => {
	try {
		const { rows } = await pool.query(
			`SELECT 
		qb.question_text, 
		a.correct_option, 
		a.option_2, 
		a.option_3, 
		a.option_4 
	FROM 
		question_bank qb
	LEFT JOIN 
		answers a ON qb.question_id = a.question_id
	WHERE 
		qb.user_id = $1;`,
			[user_id]
		);
		return rows.length ? rows : null;
	} catch (err) {
		console.error("There was an error fetching user question bank:", err);
		throw err;
	}
};

module.exports = {
	getUserInfo,
	getUserQuestionBank,
};
