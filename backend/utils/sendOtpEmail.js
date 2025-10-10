import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
export const sendOtpEmail = async (to, otp) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: "Verify your email-OTP Code",
      text: `Hi  your OTP is ${otp}. It will expire in 10minutes.`,
    };
    await transporter.sendMail(mailOptions);

    return true;
  } catch (err) {
    console.log("Error sending OTP email", err);
    return false;
  }
};
