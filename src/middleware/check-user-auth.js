const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error("Sorry! you are not authorized");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.userData = {
      email: decodedToken.UserInfo.email,
      userId: decodedToken.UserInfo.userId,
    };

    next();
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
};
