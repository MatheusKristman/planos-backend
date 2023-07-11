import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (req, res) => {
  try {
    const data = await resend.emails.send({
      from: "kristman058@gmail.com",
      to: ["matheuskristman.dev@gmail.com"],
      subject: "Hello World",
      html: `<p>teste</p>`,
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
