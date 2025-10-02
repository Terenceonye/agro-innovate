const nodemailer = require("nodemailer");

// Create transporter
const transporter = nodemailer.createTransport({
  host: "mail.agro-innovate.com", // Replace with your SMTP host
  port: 465,                // Use 465 if SSL
  secure: true,            // true for port 465, false for others
  auth: {
    user: "noreply@agro-innovate.com", // Replace with SMTP username
    pass: "Annazo@12345.",                   // Replace with SMTP password
  },
  tls: {
    rejectUnauthorized: false, // Optional
  },
});

// Reusable function
const sendEmail = async (subject, composedMessage) => {
  try {
    const mailOptions = {
      from: `"PEACE AGRO INNOVATE" <noreply@agro-innovate.com>`, 
      to: "peace@agro-innovate.com",
      subject,
      text: composedMessage, // plain text version
      html: composedMessage.replace(/\n/g, "<br>"), // HTML version
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error("❌ Email error:", err);
    return { success: false, error: err.message };
  }
};

module.exports = sendEmail;
