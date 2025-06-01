const { pool } = require("../config/dbConnection");

const createSubjectEnrollment = async (subject_id, user_id) => {
  const { rows } = await pool.query(
    "INSERT INTO subject_enrollment VALUES ($1, $2) RETURNING *;",
    [subject_id, user_id]
  );
  if (rows) {
    return rows[0];
  }
  return null;
};

const deleteSubjectEnrollment = async (subject_id, user_id) => {
  const { rows } = await pool.query(
    "DELETE FROM subject_enrollment WHERE subject_id=$1 AND user_id=$2 RETURNING *;",
    [subject_id, user_id]
  );
  if (rows) {
    return rows[0];
  }
  return null;
};

const getAllEnrolledSubjectsByUser = async (user_id) => {
  const { rows } = await pool.query(
    `SELECT s.subject_name, c.class_name, s.subject_id, c.class_id 
        FROM users u 
        JOIN subject_enrollment se ON u.user_id = se.user_id
        JOIN subjects s ON se.subject_id = s.subject_id
        JOIN classes c ON s.class_id = c.class_id
        WHERE u.user_id=$1;`,
    [user_id]
  );
  if (rows) {
    return rows;
  }
  return null;
};

const getAllEnrolledUsersBySubject = async (subject_id) => {
  const { rows } = await pool.query(
    `SELECT u.fullname, u.email, u.mobile, u.role
        FROM subjects s
        LEFT JOIN subject_enrollment se ON s.subject_id = se.subject_id
        LEFT JOIN users u ON se.user_id = u.user_id
        WHERE s.subject_id=$1;`,
    [subject_id]
  );
  if (rows) {
    return rows;
  }
  return null;
};

module.exports = {
  createSubjectEnrollment,
  deleteSubjectEnrollment,
  getAllEnrolledSubjectsByUser,
  getAllEnrolledUsersBySubject,
};
