const classEnrollmentController = require("../controllers/class_enrollment.controller");
const checkRoleAuth = require("../middleware/check-role-auth");

const { Router } = require("express");

const router = Router();

router.post(
	"/create-class-enrollment",
	checkRoleAuth("Teacher"),
	classEnrollmentController.classEnrollmentCreate
);
router.delete(
	"/delete-class-enrollment/:class_id/:user_id",
	checkRoleAuth("Teacher"),
	classEnrollmentController.classEnrollmentDelete
);

module.exports = router;
