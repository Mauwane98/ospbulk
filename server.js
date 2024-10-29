const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use other services like 'Yahoo', 'Outlook', etc.
    auth: {
        user: 'oleratomauwane02@gmail.com', // Your email
        pass: 'wszxderfc1' // Your email password or an app password
    }
});

// Endpoint to handle registration
app.post('/register', (req, res) => {
    const { fullName, email, phone, company, position, attendanceType, comments } = req.body;

    // Email content
    const subject = "Conference Registration Confirmation";
    let body = `
        Dear ${fullName},\n\n
        Thank you for registering for the OSP Conference.\n
        Your registration details are as follows:\n
        - Full Name: ${fullName}\n
        - Email: ${email}\n
        - Phone: ${phone}\n
        - Company: ${company}\n
        - Position: ${position}\n
        - Attendance Type: ${attendanceType}\n
        - Comments: ${comments}\n\n
    `;

    if (attendanceType === 'online') {
        body += "You will receive a link to join the conference closer to the event date.";
    } else {
        body += "The conference will be held at our main venue. We look forward to seeing you there!";
    }

    // Send email
    const mailOptions = {
        from: 'your_email@gmail.com',
        to: email,
        subject: subject,
        text: body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Registration successful! Confirmation email sent.');
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
