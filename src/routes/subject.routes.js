const subjectController = require("../controllers/subject.controller");
const checkAdminAuth = require("../middleware/check-admin-auth");

const { Router } = require("express");

const router = Router();

router.post("/create-subject", checkAdminAuth, subjectController.subjectCreate);
router.delete(
	"/delete-subject/:subject_id",
	checkAdminAuth,
	subjectController.deleteSubject
);

module.exports = router;
