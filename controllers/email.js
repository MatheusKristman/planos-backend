import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const smtp = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const configEmail = {
  from: "kristman058@gmail.com",
  to: process.env.NODEMAILER_USER,
  subject: "Email teste enviado do nodemailer",
  html: `<p>Email teste enviado do nodemailer</p>`,
};

export const sendEmail = async (req, res) => {
  smtp
    .sendMail(configEmail)
    .then((res) => {
      smtp.close();
      return res.status(200).json({ message: "Email enviado com sucesso" });
    })
    .catch((error) => {
      smtp.close();
      return res.status(400).json({ message: error.message });
    });
};
