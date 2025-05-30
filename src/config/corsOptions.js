const allowedOrigins = require("./allowedOrigins");

exports.corsOptions = {
	origin: function (origin, callback) {
		if (allowedOrigins.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
};
