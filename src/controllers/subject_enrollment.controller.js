const {
  createSubjectEnrollment,
  deleteSubjectEnrollment,
  getAllEnrolledSubjectsByUser,
  getAllEnrolledUsersBySubject,
} = require("../utils/subject_enrollment_utils");

exports.subjectEnrollmentCreate = async (req, res, next) => {
  const { subject_id } = req.body;
  const user_id = req.userData.userId;

  try {
    const enrollment = await createSubjectEnrollment(subject_id, user_id);

    return res.status(200).json({
      status: "Successfully enrolled to subject!",
      data: enrollment,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = "Something went wrong in the database operation!";
    }
    next(err);
  }
};

exports.subjectEnrollmentDelete = async (req, res, next) => {
  const { subject_id } = req.body;
  const user_id = req.userData.userId;

  try {
    const deletedSubjectEnrollment = await deleteSubjectEnrollment(
      subject_id,
      user_id
    );

    if (!deletedSubjectEnrollment) {
      return res.status(400).json({
        status: "Failed",
        message: "Subject enrollment does not exist",
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Subject enrollment deleted successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = "Something went wrong in the database operation!";
    }
    next(err);
  }
};

exports.AllEnrolledSubjectsByUserGet = async (req, res, next) => {
  const user_id = req.userData.userId;

  try {
    const enrolledSubjects = await getAllEnrolledSubjectsByUser(user_id);

    return res.status(200).json({
      status: "Success",
      data: enrolledSubjects,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = "Something went wrong in the database operation!";
    }
    next(err);
  }
};

exports.AllEnrolledStudentsBySubjectGet = async (req, res, next) => {
  const { subject_id } = req.params;

  try {
    const enrolledStudents = await getAllEnrolledUsersBySubject(subject_id);

    return res.status(200).json({
      status: "Success",
      data: enrolledStudents,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = "Something went wrong in the database operation!";
    }
    next(err);
  }
};
