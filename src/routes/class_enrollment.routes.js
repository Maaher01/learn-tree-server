const classEnrollmentController = require("../controllers/class_enrollment.controller");
const checkAdminAuth = require("../middleware/check-admin-auth");

const { Router } = require("express");

const router = Router();

router.post(
	"/create-class-enrollment",
	checkAdminAuth,
	classEnrollmentController.classEnrollmentCreate
);
router.delete(
	"/delete-class-enrollment/:class_id/:user_id",
	checkAdminAuth,
	classEnrollmentController.classEnrollmentDelete
);

module.exports = router;
