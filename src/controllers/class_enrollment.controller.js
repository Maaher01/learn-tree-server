const {
	createClassEnrollment,
	deleteClassEnrollment,
} = require("../utils/class_enrollment_utils");

exports.classEnrollmentCreate = async (req, res, next) => {
	const { class_id, user_id } = req.body;

	try {
		const enrollment = await createClassEnrollment(class_id, user_id);

		return res.status(200).json({
			status: "Successfully enrolled to class!",
			data: enrollment,
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
			err.message = "Something went wrong in the database operation!";
		}
		next(err);
	}
};

exports.classEnrollmentDelete = async (req, res, next) => {
	const { class_id, user_id } = req.params;

	try {
		const deletedClassEnrollment = await deleteClassEnrollment(
			class_id,
			user_id
		);

		if (!deletedClassEnrollment) {
			return res.status(404).json({
				status: "Failed",
				error: "Class enrollment does not exist",
			});
		}

		return res.status(200).json({
			status: "Success",
			data: "Class enrollment deleted successfully",
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
			err.message = "Something went wrong in the database operation!";
		}
		next(err);
	}
};
