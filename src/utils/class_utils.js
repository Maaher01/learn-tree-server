const { pool } = require("../config/dbConnection");

const getAllClasses = async () => {
  const { rows } = await pool.query("SELECT * FROM classes;");
  if (rows) {
    return rows;
  }
  return null;
};

const createClass = async (class_name) => {
  const { rows } = await pool.query(
    "INSERT INTO classes (class_name) VALUES ($1) RETURNING *;",
    [class_name]
  );
  if (rows) {
    return rows[0];
  }
  return null;
};

module.exports = {
  getAllClasses,
  createClass,
};
