const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const token = req.cookies.accessToken;

	if (!token) {
		return res.status(401).json({ message: "Unauthorized: No token provided" });
	}

	try {
		const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

		if (!decodedToken || decodedToken.UserInfo.role !== "Admin") {
			return res.status(403).json({ message: "Access denied! admins only!" });
		}

		req.adminData = {
			fullname: decodedToken.UserInfo.fullname,
			email: decodedToken.UserInfo.email,
			userId: decodedToken.UserInfo.userId,
		};

		next();
	} catch (err) {
		return res.status(403).json({ message: "Invalid or expired token" });
	}
};
