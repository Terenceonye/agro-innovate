const nodemailer = require("nodemailer");

// Create transporter
const transporter = nodemailer.createTransport({
  host: "netpro.africa", // Replace with your SMTP host
  port: 465,                // Use 465 if SSL
  secure: true,            // true for port 465, false for others
  auth: {
    user: "terence.onyeweke@netpro.africa", // Replace with SMTP username
    pass: "$nC81s4ddZO7",                   // Replace with SMTP password
  },
  tls: {
    rejectUnauthorized: false, // Optional
  },
});

// Reusable function
const sendEmail = async (subject, composedMessage) => {
  try {
    const mailOptions = {
      from: '"Peace Agro-Innovate" <terence.onyeweke@netpro.africa>', 
      to: "terence.onyeweke@netpro.africa", // ✅ fixed typo
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
