const { Pool } = require("pg");

const credentials = {
	host: process.env.DATABASE_HOST,
	database: process.env.DATABASE_NAME,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	port: process.env.DATABASE_PORT,
};

const pool = new Pool(credentials);

const connectToDatabase = async () => {
	try {
		await pool.connect();
		console.info("Connected to database...");
	} catch (error) {
		console.info("Failed to connect to database...");
		process.exit(1);
	}
};

module.exports = {
	pool,
	connectToDatabase,
};
