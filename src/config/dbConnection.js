var mysql = require("mysql2/promise");

var credentials = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
};

let connection;

const databaseConnection = async () => {
  try {
    connection = mysql.createPool(credentials);
    console.info("Connected to MySQL database...");
  } catch (error) {
    console.error("Failed to connect to database", error);
    process.exit(1);
  }
};

const getClient = () => connection;

module.exports = { databaseConnection, getClient };
