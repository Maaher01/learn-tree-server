const classController = require("../controllers/class.controller");
const checkRoleAuth = require("../middleware/check-role-auth");
const checkUserAuth = require("../middleware/check-user-auth");

const { Router } = require("express");

const router = Router();

router.get("/get-all-classes", checkUserAuth, classController.allClassesGet);
router.post(
	"/create-class",
	checkRoleAuth("Teacher"),
	classController.classCreate
);

module.exports = router;
