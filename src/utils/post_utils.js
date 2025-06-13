const { pool } = require("../config/dbConnection");

const createPost = async (post_text, user_id, class_id, subject_id) => {
	const { rows } = pool.query(
		"INSERT INTO posts (post_text, user_id, class_id, subject_id) VALUES ($1, $2, $3, $4) RETURNING *;",
		[post_text, user_id, class_id, subject_id]
	);
	if (rows) {
		return rows[0];
	}
	return null;
};

const editPost = async (post_text, post_id) => {
	const { rows } = await pool.query(
		"UPDATE posts SET post_text=$1 WHERE post_id=$2 RETURNING *;",
		[post_text, post_id]
	);
	if (rows) {
		return rows[0];
	}
	return null;
};

const deletePost = async (post_id) => {
	const { rows } = await pool.query(
		"DELETE FROM posts WHERE post_id=$1 RETURNING *;",
		[post_id]
	);
	if (rows) {
		return rows[0];
	}
	return null;
};

const getAllPostsByClassAndSubject = async (class_id, subject_id) => {
	const { rows } = await pool.query(
		`SELECT p.post_id, p.post_text, p.created_at, p.updated_at, u.user_id, u.fullname, u.image 
        FROM posts p
        JOIN users u ON u.user_id = p.user_id
        WHERE p.class_id=$1 AND p.subject_id=$2
		ORDER BY p.created_at DESC;`,
		[class_id, subject_id]
	);
	if (rows) {
		return rows;
	}
	return null;
};

module.exports = {
	createPost,
	editPost,
	deletePost,
	getAllPostsByClassAndSubject,
};
