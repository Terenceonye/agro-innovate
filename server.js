const express = require("express");
const path = require("path");
const sendEmail = require("./utils/email");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/project1", (req, res) => {
  res.render("project-details1");
});

app.get("/project2", (req, res) => {
    res.render("project-details2");
  });

  app.get("/project3", (req, res) => {
    res.render("project-details3");
  });

  app.get("/project4", (req, res) => {
    res.render("project-details4");
  });



  
  app.post("/api/contact", async (req, res) => {
    const { fullName, subject, email, message } = req.body;
  
    if (!fullName || !subject || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }
  
    const composedMessage = 
      `Name: ${fullName}\nEmail: ${email}\n\nSubject: ${subject}\n\nMessage:\n${message}`;
  
    try {
      const result = await sendEmail(subject, composedMessage);
  
      if (result.success) {
        return res.status(200).json({
          success: true,
          message: "Email sent successfully",
          messageId: result.messageId,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Failed to send email",
          error: result.error,
        });
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Unexpected error",
        error: err.message,
      });
    }
  });
  
  

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
