const { createClass } = require("../utils/class_utils");

const createClassHandler = async (req, res) => {
	const { class_name } = req.body;

	try {
		newClass = await createClass({ class_name });

		return res.status(200).json({
			status: "Class created successfully!",
			data: newClass.class_id,
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
			err.message = "Something went wrong in the database operation!";
		}
		next(err);
	}
};

module.exports = {
	createClassHandler,
};
