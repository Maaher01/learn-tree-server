const { hashPassword, comparePassword } = require("../utils/password_utils");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const {
	getUser,
	createUser,
	saveRefreshToken,
	getUserByRefreshToken,
	deleteUserRefreshToken,
} = require("../utils/auth_utils");

exports.userRegistration = async (req, res, next) => {
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

	const { fullname, email, password, mobile, role } = req.body;

	try {
		const hashedPassword = await hashPassword(password);

		let user = await getUser(email);

		if (user) {
			const error = new Error("A user with this email is already registered!");
			error.statusCode = 406;
			next(error);
		} else {
			user = await createUser({
				fullname,
				email,
				hashedPassword,
				mobile,
				role,
			});
			return res.status(200).json({
				status: "User Registration Successfull!",
				data: user.user_id,
			});
		}
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
			err.message = "Something went wrong in the database operation!";
		}
		next(err);
	}
};

exports.userLogin = async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) {
		return res.status(400).json({
			message: "Email and password are required",
		});
	}

	try {
		const user = await getUser(email);

		if (!user) {
			const error = new Error("Incorrect email or password!");
			error.statusCode = 404;
			return next(error);
		} else {
			const passMatch = await comparePassword(password, user.password);

			if (!passMatch) {
				const error = new Error("You entered a wrong password!");
				error.statusCode = 401;
				return next(error);
			} else {
				// For Json Token Generation
				const accessToken = jwt.sign(
					{
						UserInfo: {
							fullname: user.fullname,
							email: user.email,
							userId: user.user_id,
							role: user.role,
						},
					},
					process.env.ACCESS_TOKEN_SECRET,
					{
						expiresIn: "1h",
					}
				);

				const refreshToken = jwt.sign(
					{
						fullname: user.fullname,
						email: user.email,
						userId: user.user_id,
						role: user.role,
					},
					process.env.REFRESH_TOKEN_SECRET,
					{
						expiresIn: "30d",
					}
				);
				// Saving refresh token with current user
				await saveRefreshToken(user.user_id, refreshToken);

				// Creates Secure Cookie with refresh token
				res.cookie("jwt", refreshToken, {
					httpOnly: true,
					secure: true,
					sameSite: "None",
					maxAge: 30 * 24 * 60 * 60 * 1000,
				});

				res.status(200).json({
					token: accessToken,
					role: user.role,
				});
			}
		}
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
			err.message = "Something went wrong on database operation!";
		}
		next(err);
	}
};

exports.userLogout = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(204);

	const refreshToken = cookies.jwt;

	const foundUser = await getUserByRefreshToken(refreshToken);

	if (foundUser) {
		//Delete the user's refresh token
		await deleteUserRefreshToken(foundUser.user_id);
	}

	res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
	res.sendStatus(204);
};

exports.userRefreshToken = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(401);

	const refreshToken = cookies.jwt;

	const foundUser = await getUserByRefreshToken(refreshToken);

	if (!foundUser) return res.sendStatus(403);

	//Evaluate jwt
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
		if (err || foundUser.email !== decoded.email) return res.status(403);
		const accessToken = jwt.sign(
			{
				UserInfo: {
					fullname: foundUser.fullname,
					email: foundUser.email,
					userId: foundUser.user_id,
					role: foundUser.role,
				},
			},
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: "1h",
			}
		);

		return res.status(200).json({
			token: accessToken,
		});
	});
};
