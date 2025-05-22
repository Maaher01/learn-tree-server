const { pool } = require("../config/dbConnection");

const createClass = async (class_name) => {
  const { rows } = await pool.query(
    "INSERT INTO classes (class_name) VALUES ($1) RETURNING *",
    [class_name]
  );

  if (rows) {
    return rows[0];
  }
  return null;
};

module.exports = {
  createClass,
};
