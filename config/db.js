const mysql = require("mysql2");
const fs = require("fs");
require("dotenv").config();

let sslConfig;

if (process.env.RENDER) {
    // Render secret file
    sslConfig = {
        ca: fs.readFileSync("/etc/secrets/ca.pem")
    };
} else {
    // Local computer
    sslConfig = {
        ca: fs.readFileSync("./certs/ca.pem")
    };
}

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    ssl: sslConfig,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const db = pool.promise();

db.getConnection()
    .then(connection => {
        console.log("✅ Database Connected Successfully");

        connection.release();
    })
    .catch(error => {
        console.error("❌ Database Connection Failed");
        console.error("Code:", error.code);
        console.error("Message:", error.message);
    });

module.exports = db;