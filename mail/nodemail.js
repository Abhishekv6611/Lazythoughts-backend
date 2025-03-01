import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { Mailtemplate } from './Mailtemplate.js';

dotenv.config()

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, 
      pass: process.env.GMAIL_PASS, 
    },
  });
  export const ForgotPasswordEmail = async (email, resetUrl) => {
    const mailOptions = {
        from: `"Lazy thoghts" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "Want to reset Your Password!!",
        html: Mailtemplate(resetUrl)  
      };
      try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
      } catch (error) {
        console.error("Error sending email:", error);
      }
};
export const sendResetPasswordEmail=async(email)=>{
    const mailOptions = {
        from: `"TuberLink" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "Password reset successful",
        html: `Your password has been reset successfully.`,
      };
    
      try {
        await transporter.sendMail(mailOptions);
        console.log("Password reset successfully!");
      } catch (error) {
        console.error("Error sending Password reset:", error);
      }
}