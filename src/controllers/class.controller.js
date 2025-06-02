const { getAllClasses, createClass } = require("../utils/class_utils");

exports.allClassesGet = async (req, res, next) => {
  try {
    const classes = await getAllClasses();

    return res.status(200).json({
      status: "Success",
      message: "All classes fetched successfully!",
      data: classes,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = "Something went wrong in the database operation!";
    }
    next(err);
  }
};

exports.classCreate = async (req, res, next) => {
  const { class_name } = req.body;

  try {
    newClass = await createClass(class_name);

    return res.status(200).json({
      status: "Success",
      message: "Class created successfully!",
      data: newClass.class_id,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = "Something went wrong in the database operation!";
    }
    next(err);
  }
};
