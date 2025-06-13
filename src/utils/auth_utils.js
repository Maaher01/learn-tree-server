const { pool } = require("../config/dbConnection");

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
	fullname,
	email,
	hashedPassword: password,
	image,
	role,
}) => {
	const { rows } = await pool.query(
		"INSERT INTO users (fullname, email, password, image, role) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
		[fullname, email, password, image, role]
	);
	if (rows) {
		return rows[0];
	}
	return null;
};

const saveRefreshToken = async (user_id, refreshtoken) => {
	const { rows } = await pool.query(
		"UPDATE users SET refreshtoken=$1 WHERE user_id=$2;",
		[refreshtoken, user_id]
	);
	if (rows) {
		return rows[0];
	}
	return null;
};

const getUserByRefreshToken = async (refreshtoken) => {
	const { rows } = await pool.query(
		"SELECT * FROM users WHERE refreshtoken=$1;",
		[refreshtoken]
	);
	if (rows) {
		return rows[0];
	}
	return null;
};

const deleteUserRefreshToken = async (user_id) => {
	const { rows } = await pool.query(
		"UPDATE users SET refreshtoken=$1 WHERE user_id=$2;",
		["", user_id]
	);
	if (rows) {
		return rows[0];
	}
	return null;
};

module.exports = {
	getUser,
	createUser,
	saveRefreshToken,
	getUserByRefreshToken,
	deleteUserRefreshToken,
};
