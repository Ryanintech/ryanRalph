require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const { body, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");
const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());


// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});


// Prevent Spam
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "Too many requests from this IP, please try again later.",
});

app.use("/contact", limiter);


// POST Route to Handle Form Submission
app.post(
    "/contact",
    [
        body("name").trim().escape().notEmpty().withMessage("Name is required."),
        body("email_address").isEmail().withMessage("Invalid email address."),
        body("message").trim().escape().notEmpty().withMessage("Message is required."),


    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email_address, mobile_number, message } = req.body;

        const mailOptions = {
            from: email_address,
            to: process.env.EMAIL,
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email_address}\nPhone: ${mobile_number || "N/A"}\n\nMessage:\n${message}`,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).send("Email sent successfully.");
        } catch (error) {
            console.error("Error sending email:", error);
            res.status(500).send("Internal Server Error.");
        }
    }
);



// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
