const classEnrollmentController = require("../controllers/class_enrollment.controller");
const checkUserAuth = require("../middleware/check-user-auth");

const { Router } = require("express");

const router = Router();

router.post(
  "/create-class-enrollment",
  checkUserAuth,
  classEnrollmentController.classEnrollmentCreate
);
router.delete(
  "/delete-class-enrollment",
  checkUserAuth,
  classEnrollmentController.classEnrollmentDelete
);

module.exports = router;
