const { getClient } = require("../config/dbConnection");

const getUserInfo = async (user_id) => {
  const client = getClient();
  const [row] = await client.query(
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
		u.user_id = ?;`,
    [user_id]
  );
  if (row) {
    return row;
  }
  return null;
};

const getUserQuestionBank = async (user_id) => {
  const client = getClient();
  const [rows] = await client.query(
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
	LEFT JOIN 
		users u ON qb.user_id = u.user_id 
	WHERE 
		u.user_id = ?;`,
    [user_id]
  );
  if (rows) {
    return rows;
  }
  return null;
};

module.exports = {
  getUserInfo,
  getUserQuestionBank,
};
