const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		const error = new Error("Sorry! You are not authorized.");
		error.statusCode = 401;
		throw error;
	}
	const token = authHeader.split(" ")[1];
	let decodedToken;
	try {
		decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		req.userData = {
			mobile: decodedToken.UserInfo.mobile,
			email: decodedToken.UserInfo.email,
			userId: decodedToken.UserInfo.userId,
		};
		next();
	} catch (err) {
		err.statusCode = 500;
		throw err;
	}
};
