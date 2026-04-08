const express = require('express');
const router = express.Router();
const createTransporter = require('../utils/nodeMailer'); // your nodemailer file

router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
     console.log(req.body);
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const text = `
    New Contact Message

    Name: ${name}
    Email: ${email}

    Message:
    ${message}
    `;

    await createTransporter(
      process.env.EMAIL_ADDRESS,
      process.env.EMAIL_ADDRESS,
      "New Contact Form Message",
      text
    );

    res.status(200).json({ message: "Message sent successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send message" });
  }
});
module.exports = router;