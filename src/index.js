/**
 * NODEJS API
 * DATABASE MYSQL
 */
const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { databaseConnection } = require("./config/dbConnection");

const cors = require("cors");
const errorHandler = require("./middleware/error-handler");
const corsOptions = require("./config/corsOptions");
const { allowCross } = require("./middleware/cors-unblocker");

// Logger
const { logger } = require("./middleware/logEvents");

/**
 *  Router File Import
 */
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");

/**
 * MAIN APP CONFIG
 */
const app = express();

const PORT = process.env.PORT || 3000;

//Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(logger);
app.use(allowCross);

/**
 * MAIN BASE ROUTER WITH IMPORTED ROUTES
 */
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

/**
 * MAIN BASE GET PATH
 */
app.get("/", (req, res) => {
	res.send(
		`<div style="width: 100%; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center">
			<h1 style="color: blueviolet">API RUNNING...</h1>
		</div>`
	);
});

/**
 * Error Handler
 */
app.use(errorHandler.route);
app.use(errorHandler.next);

app.listen(PORT, async () => {
	await databaseConnection();
	console.log(`Server is running on http://localhost:${PORT}`);
});
