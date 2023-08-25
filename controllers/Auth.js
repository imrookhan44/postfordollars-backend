import Signup from "../models/Signup.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../config/Upload.js";
export const signup = async (req, res) => {
  const {
    email,
    name,
    password,
    webSiteLink,
    contactName,
    businessName,
    phone,
    role,
    businessImage,
    price,
    description,
  } = req.body;

  try {
    const uplaodImage = await cloudinary.uploader.upload(businessImage, {
      folder: "uploads",
    });

    const existingUser = await Signup.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new Signup({
      email,
      name,
      password: hashedPassword,
      webSiteLink,
      contactName,
      businessName,
      phone,
      role,
      businessImage: uplaodImage.secure_url,
      price,
      description,
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
        price: result.price,
        description: result.description,
        userImage: result.businessImage,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not sign up", error: error.message });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Signup.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      "your_secret_key",
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
        userImage: user.businessImage,
        price: user.price,
        description: user.description,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not sign in", error: error.message });
  }
};

export const getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Signup.find({ role: "business" });
    res.status(200).json(businesses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBusinessById = async (req, res) => {
  try {
    const getById = await Signup.findById(req.params._id);
    res.status(200).json(getById);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
