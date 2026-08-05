require("dotenv").config();

const { sendEmail } = require("./utils/email");

(async () => {

    try {

        await sendEmail(

            "johnshead37@gmail.com",

            "Test Email",

            `
            <h2>🎉 Email is Working Successfully!</h2>

            <p>Ganpati Bappa Morya 🙏</p>

            <p>This email was sent from your Mandal Management System.</p>
            `

        );

        console.log("✅ Email Sent Successfully");

    } catch (err) {

        console.log("❌ Email Error");

        console.log(err);

    }

})();