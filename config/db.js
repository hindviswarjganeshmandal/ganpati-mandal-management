const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const ca = fs.readFileSync(
    path.join(__dirname, "../certs/ca.pem")
);

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    ssl: {
        ca: ca,
        rejectUnauthorized: true
    },

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise();

promisePool.getConnection()
    .then(connection => {
        console.log("✅ Aiven MySQL Connected Successfully");
        connection.release();
    })
    .catch(err => {
        console.log("❌ Database Connection Failed");
        console.log("Code:", err.code);
        console.log("Message:", err.message);
    });

module.exports = promisePool;