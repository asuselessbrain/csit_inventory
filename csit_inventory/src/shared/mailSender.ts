import { config } from "../config";

import nodemailer from "nodemailer";

    // Create a test account or replace with real credentials.
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: config.email,
            pass: config.email_password,
        },
    });

const sendEmail = async (options: { to: string; subject: string; html: string }) => {
    

    await transporter.sendMail({
        from: `"Department of CSIT" <${config.email}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
    });
}

export default sendEmail;