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
const path = require("path");
const fs = require("fs");

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

	const { fullname, email, password, role } = req.body;

	let fileName = null;

	if (req.files && req.files.file) {
		const file = req.files.file;
		const fileSize = file.data.length;
		const ext = path.extname(file.name).toLowerCase().slice(1);
		fileName = `${file.md5}.${ext}`;
		const allowedTypes = ["jpg", "png", "jpeg", "webp", "avif"];
		const uploadPath = path.join(__dirname, "../uploads");

		if (!fs.existsSync(uploadPath)) {
			fs.mkdirSync(uploadPath, { recursive: true });
		}

		if (!allowedTypes.includes(ext))
			return res.status(422).json({
				message: "Image must be of type jpg, jpeg, webp, avif or png",
			});

		if (fileSize > 5 * 1024 * 1024)
			return res.status(422).json({ message: "Image must be less than 5MB" });

		try {
			await file.mv(path.join(uploadPath, fileName));
		} catch (err) {
			return res.status(500).json({
				message: "There was a server error uploading the image",
			});
		}
	}

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
				image: fileName,
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
				const imageUrl = user.image
					? `${req.protocol}://${req.get("host")}/uploads/${user.image}`
					: null;

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
						UserInfo: {
							fullname: user.fullname,
							email: user.email,
							userId: user.user_id,
							role: user.role,
						},
					},
					process.env.REFRESH_TOKEN_SECRET,
					{
						expiresIn: "30d",
					}
				);
				// Saving refresh token with current user
				await saveRefreshToken(user.user_id, refreshToken);

				// Set access token in cookie
				res.cookie("accessToken", accessToken, {
					httpOnly: true,
					secure: false,
					sameSite: "Lax",
					maxAge: 60 * 60 * 1000, // 1 hour
				});

				// Set refresh token in cookie
				res.cookie("refreshToken", refreshToken, {
					httpOnly: true,
					secure: false,
					sameSite: "Lax",
					maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
				});

				res.status(200).json({
					user: {
						id: user.user_id,
						fullname: user.fullname,
						email: user.email,
						image: imageUrl,
						role: user.role,
					},
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
	if (!cookies?.refreshToken) return res.sendStatus(204);

	const refreshToken = cookies.refreshToken;

	const foundUser = await getUserByRefreshToken(refreshToken);
	if (foundUser) {
		//Delete the user's refresh token
		await deleteUserRefreshToken(foundUser.user_id);
	}

	res.clearCookie("refreshToken", {
		httpOnly: true,
		sameSite: "Lax",
		secure: false,
	});

	res.sendStatus(204);
};

exports.userRefreshToken = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.refreshToken) return res.sendStatus(204);

	const refreshToken = cookies.refreshToken;

	const foundUser = await getUserByRefreshToken(refreshToken);
	if (!foundUser) return res.sendStatus(403);

	//Evaluate jwt
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
		if (err || foundUser.email !== decoded.UserInfo.email) {
			return res
				.status(403)
				.json({ message: "Forbidden: Invalid or expired refresh token" });
		}

		const imageUrl = foundUser.image
			? `${req.protocol}://${req.get("host")}/uploads/${foundUser.image}`
			: null;

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

		// Set access token as cookie
		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: false,
			sameSite: "Lax",
			maxAge: 60 * 60 * 1000, // 1 hour
		});

		return res.status(200).json({
			token: accessToken,
			user: {
				id: foundUser.user_id,
				fullname: foundUser.fullname,
				email: foundUser.email,
				image: imageUrl,
				role: foundUser.role,
			},
		});
	});
};
