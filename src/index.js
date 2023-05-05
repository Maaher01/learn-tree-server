const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { databaseConnection } = require("./config/config");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");

const app = express();

const PORT = process.env.PORT || 3000;

//Middlewares
app.use(cors({ credentials: true, origin: "http://localhost:4200" }));
app.use(express.json());

//Routes
app.use("/api/user", authRouter);
app.use("/api/home", userRouter);

const server = app.listen(PORT, async () => {
	await databaseConnection();
	console.log(`Server is running on port ${PORT}`);
});
