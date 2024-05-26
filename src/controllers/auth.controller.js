const { hashPassword, comparePassword } = require("../utils/password_utils");
const { validationResult } = require("express-validator");
const {
  getUser,
  createUser,
  updateUserPassword,
} = require("../utils/auth_utils");

const registerUserHandler = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error(
      "Input Validation Error! Please complete required information."
    );
    error.statusCode = 422;
    error.data = errors.array();
    next(error);
    return;
  }

  const {
    name,
    email,
    password,
    mobile,
    birth_date,
    gender,
    address,
    father_name,
    mother_name,
    role,
  } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    let user = await getUser(email);

    if (user) {
      const error = new Error("A user with this email is already registered!");
      error.statusCode = 406;
      next(error);
    } else {
      user = await createUser({
        name,
        email,
        hashedPassword,
        mobile,
        birth_date,
        gender,
        address,
        father_name,
        mother_name,
        role,
      });
      return res.status(200).json({
        status: "Admin Registration Successfull!",
        data: user.user_id,
      });
    }
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = "Something went wrong on database operation!";
    }
    next(err);
  }
};

const loginUserHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUser(email);
    if (!user) {
      return res.status(404).json({
        status: "failed",
        error: "User does not exist",
      });
    }
    const compareResult = await comparePassword(password, user.password);
    if (!compareResult) {
      return res.status(404).json({
        status: "failed",
        error: "Incorrect password",
      });
    }
    const userResponse = {
      id: user.user_id,
      name: user.name,
      // role: user.role,
    };
    return res.status(200).json({
      status: "Success",
      data: { user: userResponse },
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: "Failed to log in. Please try again later.",
    });
  }
};

const forgotPasswordHandler = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    let user = await getUser(email);
    if (!user) {
      return res.status(404).json({
        status: "failed",
        error: "No user found with this email",
      });
    }
    const hashedPassword = await hashPassword(newPassword);
    await updateUserPassword(user.email, hashedPassword);
    const userResponse = {
      id: user.user_id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    return res.status(200).json({
      status: "Success",
      error: { user: userResponse },
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: "Failed to change password. Please try again later.",
    });
  }
};

module.exports = {
  registerUserHandler,
  loginUserHandler,
  forgotPasswordHandler,
};
