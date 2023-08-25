import PosterAuth from "../models/PosterAuth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const signupPosterAccount = async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  try {
    const existingUser = await PosterAuth.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new PosterAuth({
      email,
      name,
      password: hashedPassword,
      phone,
      role,
    });

    const result = await newUser.save();
    const token = jwt.sign(
      { email: result.email, id: result._id },
      "your_secret_key",
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token,
      user: {
        id: result._id,
        email: result.email,
        name: result.name,
        role: result.role,
        phone: result.phone,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not sign up", error: error.message });
  }
};


