const nodemailer = require("nodemailer")
const { google } = require('googleapis');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.ionos.com',
  port: 587,            
  secure: false,        
  auth: {
      user: process.env.EMAIL_ADDRESS, 
      pass: process.env.EMAIL_PASSWORD,
  },
});

const createTransporter = async (email,to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: email, 
            to,                                       
            subject,                                   
            text,                        
        });

        console.log('Email sent:', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
  };

module.exports = createTransporter



// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_PASS,
//   },
// });

// const createTransporter = async (to, subject, text) => {
//   try {
//     const info = await transporter.sendMail({
//       from: `"Your Company" <iotcloud@xtranssolutions.com>`, // 👈 keep your company email
//       to,
//       subject,
//       text,
//     });

//     console.log("Email sent:", info.messageId);
//   } catch (err) {
//     console.error(err);
//   }
// };

// module.exports = createTransporter;
