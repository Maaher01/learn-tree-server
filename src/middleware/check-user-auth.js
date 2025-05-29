const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    const error = new Error("Unauthorized: No token provided");
    error.statusCode = 401;
    return next(error);
  }

  try {
    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    req.userData = {
      email: decodedToken.UserInfo.email,
      userId: decodedToken.UserInfo.userId,
    };

    next();
  } catch (err) {
    err.statusCode = 403;
    err.message = "Invalid or expired token";
    next(err);
  }
};
