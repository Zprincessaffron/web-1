import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

export const sendOTP = (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It expires in 10 minutes.`,
    };

    return transporter.sendMail(mailOptions);
};

