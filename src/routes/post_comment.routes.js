const postCommentController = require("../controllers/post_comment.controller");
const checkUserAuth = require("../middleware/check-user-auth");

const Router = require("express");

const router = Router();

router.post(
	"/create-comment",
	checkUserAuth,
	postCommentController.postCommentCreate
);
router.put(
	"/edit-comment/:comment_id",
	checkUserAuth,
	postCommentController.commentEdit
);
router.delete(
	"/delete-comment",
	checkUserAuth,
	postCommentController.commentDelete
);
router.get(
	"/get-comments-by-post",
	checkUserAuth,
	postCommentController.commentsByPostGet
);

module.exports = router;
