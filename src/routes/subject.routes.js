const subjectController = require("../controllers/subject.controller");
const checkAdminAuth = require("../middleware/check-admin-auth");
const checkUserAuth = require("../middleware/check-user-auth");

const { Router } = require("express");

const router = Router();

router.post(
  "/create-subject",
  checkUserAuth,
  checkAdminAuth,
  subjectController.subjectCreate
);
router.delete(
  "/delete-subject/:subject_id",
  checkUserAuth,
  checkAdminAuth,
  subjectController.deleteSubject
);

module.exports = router;
