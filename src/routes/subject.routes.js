const subjectController = require("../controllers/subject.controller");
const checkRoleAuth = require("../middleware/check-role-auth");
const checkUserAuth = require("../middleware/check-user-auth");

const { Router } = require("express");

const router = Router();

router.post(
	"/create-subject",
	checkRoleAuth("Teacher"),
	subjectController.subjectCreate
);
router.get(
	"/get-subject-details/:class_id/:subject_id",
	checkUserAuth,
	subjectController.subjectDetailsGet
);
router.get(
	"/get-subjects-by-class/:class_id",
	checkUserAuth,
	subjectController.getSubjectsByClass
);
router.delete(
	"/delete-subject/:class_id/:subject_id",
	checkRoleAuth("Teacher"),
	subjectController.subjectDelete
);

module.exports = router;
