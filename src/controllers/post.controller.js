const {
	createPost,
	editPost,
	deletePost,
	getAllPostsByClassAndSubject,
} = require("../utils/post_utils");

exports.postCreate = async (req, res, next) => {
	const { post_text, class_id, subject_id } = req.body;
	const user_id = req.userData.userId;

	try {
		const post = await createPost(post_text, user_id, class_id, subject_id);

		return res.status(200).json({
			status: "Success",
			data: post,
			message: "Post created successfully!",
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
			err.message = "Something went wrong in the database operation";
		}
		next(err);
	}
};

exports.postEdit = async (req, res, next) => {
	const { post_id } = req.params;
	const { post_text } = req.body;

	try {
		const editedPost = await editPost(post_text, post_id);

		res.status(200).json({
			status: "Success",
			data: editedPost,
			message: "Post edited successfully",
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
			err.message = "Something went wrong in the database operation";
		}
		next(err);
	}
};

exports.postDelete = async (req, res, next) => {
	const { post_id } = req.body;

	try {
		const deletedPost = await deletePost(post_id);

		if (!deletePost) {
			return res.status(404).json({
				status: "Failed",
				message: "Post does not exist",
			});
		}

		return res.status(200).json({
			status: "Success",
			data: deletedPost,
			message: "Post deleted successfully!",
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
			err.message = "Something went wrong in the database operation";
		}
		next(err);
	}
};

exports.postsByClassSubjectGet = async (req, res, next) => {
	const { class_id, subject_id } = req.params;

	try {
		const posts = await getAllPostsByClassAndSubject(class_id, subject_id);

		postWithImageUrls = posts.map((post) => ({
			...post,
			imageUrl: post.image
				? `${req.protocol}://${req.get("host")}/uploads/${post.image}`
				: null,
		}));

		return res.status(200).json({
			status: "Success",
			data: postWithImageUrls,
			message: "Fetched posts successfully",
		});
	} catch (err) {
		console.log(err);

		if (!err.statusCode) {
			err.statusCode = 500;
			err.message = "Something went wrong in the database operation";
		}
		next(err);
	}
};
