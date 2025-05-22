const { pool } = require("../config/dbConnection");

const createClassEnrollment = async (class_id, user_id) => {
  const { rows } = await pool.query(
    "INSERT INTO class_enrollment VALUES ($1, $2) RETURNING *",
    [class_id, user_id]
  );
  if (rows) {
    return rows[0];
  }
  return null;
};

const deleteClassEnrollment = async (class_id, user_id) => {
  const { rows } = await pool.query(
    "DELETE FROM class_enrollment WHERE class_id=$1 AND user_id=$2 RETURNING *;",
    [class_id, user_id]
  );
  if (rows) {
    return rows[0];
  }
  return null;
};

module.exports = {
  createClassEnrollment,
  deleteClassEnrollment,
};
