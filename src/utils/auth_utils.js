const { getClient } = require("../config/dbConnection");

const getUser = async (email) => {
  const client = getClient();
  const { rows } = await client.query("SELECT * FROM users WHERE email=?;", [
    email,
  ]);
  if (rows) {
    return rows[0];
  }
  return null;
};

const createUser = async ({
  name,
  email,
  hashedPassword: password,
  mobile,
  birth_date,
  gender,
  address,
  father_name,
  mother_name,
  role,
}) => {
  const client = getClient();
  const row = await client.query(
    "INSERT INTO users (name, email, password, birth_date, mobile, gender, address, father_name, mother_name, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      name,
      email,
      password,
      birth_date,
      mobile,
      gender,
      address,
      father_name,
      mother_name,
      role,
    ]
  );
  if (row) {
    return row;
  }
  return null;
};

const updateUserPassword = async (email, newPassword) => {
  const client = getClient();
  const row = await client.query("UPDATE users SET password=? WHERE email=?", [
    newPassword,
    email,
  ]);
  if (row) {
    return row[0];
  }
  return null;
};

module.exports = {
  getUser,
  createUser,
  updateUserPassword,
};
