const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const authHeader = req.get("Authorization");

	if (!authHeader) {
		const error = new Error("Unauthorized: No token provided");
		error.statusCode = 401;
		throw error;
	}

	const token = authHeader.split(" ")[1];

	let decodedToken;

	try {
		decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
	} catch (err) {
		err.statusCode = 403;
		throw error;
	}

	if (!decodedToken || decodedToken.UserInfo.role !== "Admin") {
		const error = new Error("Access denied. Admins only.");
		error.statusCode = 403;
		throw error;
	}

	req.adminData = {
		fullname: decodedToken.UserInfo.fullname,
		email: decodedToken.UserInfo.email,
		userId: decodedToken.UserInfo.user_id,
	};

	next();
};
