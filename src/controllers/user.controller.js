const {
	getUserInfo,
	getUserQuestionBank,
	// getUserRole,
} = require("../utils/user_utils");

const userInfoHandler = async (req, res) => {
	const { user_id } = req.body;
	try {
		const userInfo = await getUserInfo(user_id);
		if (!userInfo) {
			return res.status(404).json({
				status: "failed",
				error: "Failed to get user info.",
			});
		}
		return res.status(200).json({
			status: "Success",
			data: userInfo,
		});
	} catch {
		res.status(500).json({
			status: "failed",
			error: "Failed to get user info. Please try again later.",
		});
	}
};

// const userRoleHandler = async (req, res) => {
// 	const { user_id } = req.body;
// 	try {
// 		const userRole = await getUserRole(user_id);
// 		if (!userRole) {
// 			return res.status(404).json({
// 				status: "failed",
// 				error: "User does not exist",
// 			});
// 		}
// 		const userResponse = {
// 			role: userRole.role,
// 		};
// 		return res.status(200).json({
// 			status: "Success",
// 			data: { userRole: userResponse },
// 		});
// 	} catch (err) {
// 		res.status(500).json({
// 			ststus: "failed",
// 			error: "Failed. Please try again later",
// 		});
// 	}
// };

const userQuestionBankHandler = async (req, res) => {
	const { user_id } = req.body;
	try {
		const userQuestionBank = await getUserQuestionBank(user_id);
		if (!userQuestionBank) {
			res.status(404).json({
				status: "failed",
				error: "Failed to get question bank",
			});
		}
		return res.status(200).json({
			status: "Success",
			data: userQuestionBank,
		});
	} catch {
		res.status(500).json({
			status: "failed",
			error: "Failed to get question bank. Please try again later.",
		});
	}
};

module.exports = {
	userInfoHandler,
	// userRoleHandler,
	userQuestionBankHandler,
};
