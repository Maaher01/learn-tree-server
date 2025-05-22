const { createSubject, deleteSubject } = require("../utils/subject_utils");

exports.subjectCreate = async (req, res, next) => {
  const { subject_name, class_id } = req.body;

  try {
    const newSubject = await createSubject(subject_name, class_id);

    return res.status(200).json({
      status: "Success",
      data: { ...newSubject },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = "Something went wrong in the database operation!";
    }
    next(err);
  }
};

exports.deleteSubject = async (req, res, next) => {
  const { subject_id } = req.params;

  try {
    const deletedSubject = await deleteSubject(subject_id);

    if (!deletedSubject) {
      return res.status(404).json({
        status: "Failed",
        error: "Subject does not exist",
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Subject deleted successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = "Something went wrong in the database operation!";
    }
    next(err);
  }
};
