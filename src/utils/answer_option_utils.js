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

const getAnswerOptionsByQuestion = async (question_id) => {
  const { rows } = await pool.query(
    "SELECT a.option_text, a.is_correct FROM answer_options a WHERE question_id=$1;",
    [question_id]
  );
  if (rows) {
    return rows;
  }
  return null;
};

module.exports = {
  createAnswerOption,
  getAnswerOptionsByQuestion,
};
