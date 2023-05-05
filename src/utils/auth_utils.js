const { pool } = require("../config/config");

const getUser = async (email) => {
	const { rows } = await pool.query("SELECT * FROM users WHERE email=$1;", [
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
	const { rows } = await pool.query(
		"INSERT INTO users (name, email, password, birth_date, mobile, gender, address, father_name, mother_name, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
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
	if (rows) {
		return rows[0];
	}
	return null;
};

const updateUserPassword = async (email, newPassword) => {
	const { rows } = await pool.query(
		"UPDATE users SET password=$1 WHERE email=$2 RETURNING *",
		[newPassword, email]
	);
	if (rows) {
		return rows[0];
	}
	return null;
};

module.exports = {
	getUser,
	createUser,
	updateUserPassword,
};
