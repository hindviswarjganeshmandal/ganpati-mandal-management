const bcrypt = require("bcrypt");
const db = require("./config/db");

async function createAdmin() {

    const password = await bcrypt.hash("admin@123", 10);

    await db.execute(
        "INSERT INTO admins(username,password) VALUES(?,?)",
        [
            "admin",
            password
        ]
    );

    console.log("✅ Admin Created");

    process.exit();

}

createAdmin();