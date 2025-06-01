const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.userData = {
      email: decodedToken.UserInfo.email,
      userId: decodedToken.UserInfo.userId,
      fullname: decodedToken.UserInfo.fullname,
      role: decodedToken.UserInfo.role,
    };

    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
