/**
 * NODEJS API
 * DATABASE PostgreSQL
 */
const express = require("express");
require("dotenv").config();
const FileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const { connectToDatabase } = require("./config/dbConnection");
const path = require("path");

/**
 *  CORS Configuration
 */
const cors = require("cors");
const { corsOptions } = require("./config/corsOptions");

/**
 *  Middleware File Import
 */
const errorHandler = require("./middleware/error-handler");
const { allowCross } = require("./middleware/cross-unblocker");
// Logger
const { logger } = require("./middleware/logEvents");

/**
 *  Router File Import
 */
const authRouter = require("./routes/auth.routes");
const classRouter = require("./routes/class.routes");
const classEnrollmentRouter = require("./routes/class_enrollment.routes");
const subjectRouter = require("./routes/subject.routes");
const subjectEnrollmentRouter = require("./routes/subject_enrollment.routes");
const questionRouter = require("./routes/question.routes");
const answerOptionRouter = require("./routes/answer_option.routes");
const postRouter = require("./routes/post.routes");
const postCommentRouter = require("./routes/post_comment.routes");

/**
 * MAIN APP CONFIG
 */
const app = express();

const PORT = process.env.PORT;

//Middlewares
app.use(cors(corsOptions));
app.use(allowCross);
app.use(express.json());
app.use(cookieParser());
// app.use(logger);
app.use(FileUpload());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/**
 * MAIN BASE ROUTER WITH IMPORTED ROUTES
 */
app.use("/api/auth", authRouter);
app.use("/api/class", classRouter);
app.use("/api/class-enrollment", classEnrollmentRouter);
app.use("/api/subject", subjectRouter);
app.use("/api/subject-enrollment", subjectEnrollmentRouter);
app.use("/api/question", questionRouter);
app.use("/api/answer-option", answerOptionRouter);
app.use("/api/post", postRouter);
app.use("/api/post-comment", postCommentRouter);

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
app.use(errorHandler.notFoundHandler);
app.use(errorHandler.globalErrorHandler);

app.listen(PORT, async () => {
	await connectToDatabase();
	console.info(`Server is running on http://localhost:${PORT}`);
});
