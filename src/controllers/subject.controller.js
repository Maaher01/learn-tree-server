const {
	createSubject,
	deleteSubject,
	getSubjectDetails,
	getSubjectsByClass,
} = require("../utils/subject_utils");

exports.subjectCreate = async (req, res, next) => {
	const { subject_name, class_id } = req.body;

	try {
		const newSubject = await createSubject(subject_name, class_id);

		return res.status(200).json({
			status: "Success",
			data: { ...newSubject },
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
			err.message = "Something went wrong in the database operation!";
		}
		next(err);
	}
};

exports.subjectDetailsGet = async (req, res, next) => {
	const { class_id, subject_id } = req.params;

	try {
		const subject = await getSubjectDetails(class_id, subject_id);

		return res.status(200).json({
			status: "Success",
			message: "Fetched subject details successfully!",
			data: subject,
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
			err.message = "Something went wrong in the database operation!";
		}
		next(err);
	}
};

exports.subjectDelete = async (req, res, next) => {
	const { subject_id } = req.params;

	try {
		const deletedSubject = await deleteSubject(subject_id);

		if (!deletedSubject) {
			return res.status(404).json({
				status: "Failed",
				error: "Subject does not exist",
			});
		}

		return res.status(200).json({
			status: "Success",
			message: "Subject deleted successfully",
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
			err.message = "Something went wrong in the database operation!";
		}
		next(err);
	}
};

exports.getSubjectsByClass = async (req, res, next) => {
	const { class_id } = req.params;

	try {
		const subjects = await getSubjectsByClass(class_id);

		return res.status(200).json({
			status: "Success",
			message: "Fetched all subjects successfully!",
			data: subjects,
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
			err.message = "Something went wrong in the database operation";
		}
		next(err);
	}
};
