import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email });

    if (!admin) {
      return res.status(404).json({ message: "Email ou Senha invalidos!" });
    }

    const isMatch = password === admin.password;

    if (!isMatch) {
      return res.status(400).json({ message: "Email ou Senha invalidos!" });
    }

    const token = jwt.sign({ token: admin._id }, process.env.JWT_SECRET);

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const verifyAdmin = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ verified: false });
    }

    return res.status(200).json({ token: req.user, verified: true });
  } catch (err) {
    return res.status(401).json({ message: err.message, verified: false });
  }
};
