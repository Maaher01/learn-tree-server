const { hashPassword, comparePassword } = require("../utils/password_utils");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { getUser, createUser } = require("../utils/auth_utils");

const registerUserHandler = async (req, res, next) => {
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
				status: "User Registration Successfull!",
				data: user.user_id,
			});
		}
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
			err.message = "Something went wrong on database operation!";
		}
		next(err);
	}
};

const loginUserHandler = async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) {
		res.status(400).json({
			message: "Email and password are required",
		});
	}

	let loadedUser;

	try {
		const user = await getUser(email);

		if (!user) {
			const error = new Error("A user with this email could not be found!");
			error.statusCode = 404;
			next(error);
		} else {
			loadedUser = user;

			const passMatch = await comparePassword(password, user.password);

			if (!passMatch) {
				const error = new Error("You entered a wrong password!");
				error.statusCode = 401;
				next(error);
			} else {
				// For Json Token Generation
				const accessToken = jwt.sign(
					{
						UserInfo: {
							username: loadedUser.name,
							email: loadedUser.email,
							userId: loadedUser.user_id,
						},
					},
					process.env.ACCESS_TOKEN_SECRET,
					{
						expiresIn: "1h",
					}
				);

				const refreshToken = jwt.sign(
					{
						username: loadedUser.username,
						email: loadedUser.email,
						userId: loadedUser._id,
					},
					process.env.REFRESH_TOKEN_SECRET,
					{
						expiresIn: "30d",
					}
				);
				// Creates Secure Cookie with refresh token
				res.cookie("jwt", refreshToken, {
					httpOnly: true,
					secure: true,
					sameSite: "None",
					maxAge: 24 * 60 * 60 * 1000,
				});

				res.status(200).json({
					token: accessToken,
					role: loadedUser.role,
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

module.exports = {
	registerUserHandler,
	loginUserHandler,
};
