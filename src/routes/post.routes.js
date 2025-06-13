const postController = require("../controllers/post.controller");
const checkUserAuth = require("../middleware/check-user-auth");

const Router = require("express");

const router = Router();

router.post("/create-post", checkUserAuth, postController.postCreate);
router.delete("/delete-post", checkUserAuth, postController.postDelete);
router.put("/edit-post/:post_id", checkUserAuth, postController.postEdit);
router.get(
	"/posts/:class_id/:subject_id",
	checkUserAuth,
	postController.postsByClassSubjectGet
);

module.exports = router;
