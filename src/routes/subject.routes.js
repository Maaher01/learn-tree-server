const subjectController = require("../controllers/subject.controller");
const checkAdminAuth = require("../middleware/check-admin-auth");
const checkUserAuth = require("../middleware/check-user-auth");

const { Router } = require("express");

const router = Router();

router.post("/create-subject", checkAdminAuth, subjectController.subjectCreate);
router.get(
  "/get-subject-details/:subject_id",
  checkUserAuth,
  subjectController.subjectDetailsGet
);
router.delete(
  "/delete-subject/:subject_id",
  checkAdminAuth,
  subjectController.subjectDelete
);

module.exports = router;
