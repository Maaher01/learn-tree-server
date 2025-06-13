const { pool } = require("../config/dbConnection");

const createComment = async (comment_text, user_id, post_id) => {
	const { rows } = await pool.query(
		"INSERT INTO post_comments (comment_text, user_id, post_id) VALUES ($1, $2, $3) RETURNING *;",
		[comment_text, user_id, post_id]
	);
	if (rows) {
		return rows[0];
	}
	return null;
};

const editComment = async (comment_text, comment_id) => {
	const { rows } = await pool.query(
		"UPDATE post_comments SET comment_text=$1 WHERE comment_id=$2 RETURNING *;",
		[comment_text, comment_id]
	);
	if (rows) {
		return rows[0];
	}
	return null;
};

const deleteComment = async (comment_id) => {
	const { rows } = await pool.query(
		"DELETE FROM post_comments WHERE comment_id=$1 RETURNING *;",
		[comment_id]
	);
	if (rows) {
		return rows[0];
	}
	return null;
};

const getCommentsByPost = async (post_id) => {
	const { rows } = await pool.query(
		`SELECT pc.comment_id, pc.created_at, pc.comment_text, pc.user_id, u.fullname, u.image, 
        (select COUNT (*) from post_comments where post_id=$1) as comment_count
         FROM post_comments pc
         JOIN users u ON pc.user_id = u.user_id
         WHERE pc.post_id=$1
		 ORDER BY pc.created_at DESC;`,
		[post_id]
	);
	if (rows) {
		return rows;
	}
	return null;
};

module.exports = {
	createComment,
	editComment,
	deleteComment,
	getCommentsByPost,
};
