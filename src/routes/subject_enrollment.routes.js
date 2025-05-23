const subjectEnrollmentController = require("../controllers/subject_enrollment.controller");
const checkUserAuth = require("../middleware/check-user-auth");

const { Router } = require("express");

const router = Router();

router.post(
	"/create-subject-enrollment",
	checkUserAuth,
	subjectEnrollmentController.subjectEnrollmentCreate
);
router.delete(
	"/delete-subject-enrollment",
	checkUserAuth,
	subjectEnrollmentController.subjectEnrollmentDelete
);
router.get(
	"/get-all-subjects",
	checkUserAuth,
	subjectEnrollmentController.AllEnrolledSubjectsByUserGet
);
router.get(
	"/get-all-students/:subject_id",
	checkUserAuth,
	subjectEnrollmentController.AllEnrolledStudentsBySubjectGet
);

module.exports = router;
