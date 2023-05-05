const { hashPassword, comparePassword } = require("../utils/password_utils");
const {
	getUser,
	createUser,
	updateUserPassword,
} = require("../utils/auth_utils");

const registerUserHandler = async (req, res) => {
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
		let user = await getUser(email);
		if (user) {
			return res
				.status(403)
				.json({ status: "Failed", error: "Email is already in use" });
		}
		const hashedPassword = await hashPassword(password);
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
		const userResponse = {
			id: user.user_id,
			name: user.name,
			email: user.email,
			mobile: user.mobile,
			birth_date: user.birth_date,
			gender: user.gender,
			address: user.address,
			father_name: user.father_name,
			mother_name: user.mother_name,
			role: user.role,
			entry: user.date_created,
		};
		return res
			.status(200)
			.json({ status: "Success", data: { user: userResponse } });
	} catch (error) {
		res.status(500).json({
			status: "failed",
			error: "Failed to create user. Please try again later.",
		});
	}
};

const loginUserHandler = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await getUser(email);
		if (!user) {
			return res.status(404).json({
				status: "failed",
				error: "User does not exist",
			});
		}
		const compareResult = await comparePassword(password, user.password);
		if (!compareResult) {
			return res.status(404).json({
				status: "failed",
				error: "Incorrect password",
			});
		}
		const userResponse = {
			id: user.user_id,
			name: user.name,
			// role: user.role,
		};
		return res.status(200).json({
			status: "Success",
			data: { user: userResponse },
		});
	} catch (err) {
		res.status(500).json({
			status: "failed",
			error: "Failed to log in. Please try again later.",
		});
	}
};

const forgotPasswordHandler = async (req, res) => {
	const { email, newPassword } = req.body;
	try {
		let user = await getUser(email);
		if (!user) {
			return res.status(404).json({
				status: "failed",
				error: "No user found with this email",
			});
		}
		const hashedPassword = await hashPassword(newPassword);
		await updateUserPassword(user.email, hashedPassword);
		const userResponse = {
			id: user.user_id,
			name: user.name,
			email: user.email,
			role: user.role,
		};
		return res.status(200).json({
			status: "Success",
			error: { user: userResponse },
		});
	} catch (error) {
		res.status(500).json({
			status: "failed",
			error: "Failed to change password. Please try again later.",
		});
	}
};

module.exports = {
	registerUserHandler,
	loginUserHandler,
	forgotPasswordHandler,
};
