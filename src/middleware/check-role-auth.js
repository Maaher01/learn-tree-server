const jwt = require("jsonwebtoken");

const checkRoleAuth = (...allowedRoles) => {
	return (req, res, next) => {
		const token = req.cookies.accessToken;

		if (!token) {
			return res
				.status(401)
				.json({ message: "Unauthorized: No token provided" });
		}

		try {
			const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

			const userInfo = decodedToken?.UserInfo;

			if (!userInfo || !allowedRoles.includes(userInfo.role)) {
				return res
					.status(403)
					.json({ message: `Access denied for ${userInfo?.role}s!` });
			}

			req.userData = {
				email: userInfo.email,
				userId: userInfo.userId,
				fullname: userInfo.fullname,
				role: userInfo.role,
			};

			next();
		} catch (err) {
			return res.status(403).json({ message: "Invalid or expired token" });
		}
	};
};

module.exports = checkRoleAuth;
