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

const getAllQuestionsByClassAndSubject = async (class_id, subject_id) => {
  const { rows } = await pool.query(
    "SELECT q.question_id, q.question_text, q.full_marks FROM questions q WHERE class_id=$1 AND subject_id=$2;",
    [class_id, subject_id]
  );
  if (rows) {
    return rows;
  }
  return null;
};

module.exports = {
  createQuestion,
  getAllQuestionsByClassAndSubject,
};
