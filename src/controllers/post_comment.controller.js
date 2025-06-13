const {
	createComment,
	getCommentsByPost,
	editComment,
	deleteComment,
} = require("../utils/post_comment_utils");

exports.postCommentCreate = async (req, res, next) => {
	const { comment_text, post_id } = req.body;
	const user_id = req.userData.userId;

	try {
		const comment = await createComment(comment_text, user_id, post_id);

		return res.status(200).json({
			status: "Success",
			data: comment,
			message: "Commented successfully",
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
			err.message = "Something went wrong in the database operation";
		}
		next(err);
	}
};

exports.commentEdit = async (req, res, next) => {
	const { comment_id } = req.params;
	const { comment_text } = req.body;

	try {
		const editedComment = await editComment(comment_text, comment_id);

		res.status(200).json({
			status: "Success",
			data: editedComment,
			message: "Comment edited successfully",
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
			err.message = "Something went wrong in the database operation";
		}
		next(err);
	}
};

exports.commentDelete = async (req, res, next) => {
	const { comment_id } = req.body;

	try {
		const deletedComment = await deleteComment(comment_id);

		if (!deletedComment) {
			return res.status(404).json({
				status: "Failed",
				message: "Comment does not exist",
			});
		}

		return res.status(200).json({
			status: "Success",
			data: deletedComment,
			message: "Comment deleted successfully!",
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
			err.message = "Something went wrong in the database operation";
		}
		next(err);
	}
};

exports.commentsByPostGet = async (req, res, next) => {
	const { postId } = req.query;

	try {
		const comments = await getCommentsByPost(postId);

		if (comments.length === 0) {
			return res.status(200).json({
				message: "This post has no comments",
				data: [],
			});
		}

		commentsWithImageUrls = comments.map((comment) => ({
			...comment,
			imageUrl: comment.image
				? `${req.protocol}://${req.get("host")}/uploads/${comment.image}`
				: null,
		}));

		return res.status(200).json({
			status: "Success",
			data: commentsWithImageUrls,
			message: "Successfully fetched all post comments",
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
			err.message = "Something went wrong in the database operation";
		}
		next(err);
	}
};
