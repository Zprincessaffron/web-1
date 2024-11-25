// mailController.js
import transporter from '../config/transporter.js';
import dotenv from 'dotenv';
dotenv.config()

export const sendMail = (req, res) => {
  const { name, email, message } = req.body;
  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: `query from ${name}`,
    text: `from ${email} ${message}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error sending message' });
    } else {
      res.status(200).json({ message: 'Message sent successfully' });
    }
  });
};
