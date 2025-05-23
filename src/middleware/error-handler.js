exports.globalErrorHandler = (error, req, res, next) => {
	const status = error.statusCode || 500;
	const message = error.message;
	const data = error.data;

	res.status(status).json({
		message: message,
		statusCode: status,
		errorData: data,
	});
};

exports.notFoundHandler = (req, res, next) => {
	const err = new Error("No routes found!");
	err.statusCode = 404;
	next(err);
};
