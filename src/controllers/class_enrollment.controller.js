const {
  createClassEnrollment,
  deleteClassEnrollment,
} = require("../utils/class_enrollment_utils");

exports.classEnrollmentCreate = async (req, res) => {
  const { class_id } = req.body;
  const user_id = req.userData.userId;

  try {
    const enrollment = await createClassEnrollment(class_id, user_id);

    return res.status(200).json({
      status: "Enrolled Successfully",
      data: enrollment,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.classEnrollmentDelete = async (req, res) => {
  const { class_id } = req.body;
  const user_id = req.userData.userId;

  try {
    const deletedClassEnrollment = await deleteClassEnrollment(
      class_id,
      user_id
    );

    if (!deletedClassEnrollment) {
      return res.status(404).json({
        status: "Failed",
        error: "Class enrollment does not exist",
      });
    }

    return res.status(200).json({
      status: "Success",
      data: "Class enrollment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error: error.message,
    });
  }
};
