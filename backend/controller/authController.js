const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findUserByemail(email);
  if (existingUser)
    return res.status(400).json({ message: "User already exisit" });
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.createUser(name, email, hashedPassword);
  res.status(201).json({ message: "User registered successfully" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findUserByemail(email);
  if (!existingUser)
    return res.status(400).json({ message: "Invalid Creditionals" });

  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch)
    return res.status(400).json({ message: "Invalid Creditionals" });
  const accessToken = generateToken(existingUser);
  const refreshToken = generateRefreshToken(existingUser);
  // res.cookie("token", accessToken, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "strict",
  // });
  // console.log("heeee", refreshToken, accessToken);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/auth/refresh-token",
  });
  res.json({
    accessToken,
    user: { id: existingUser.id, email: existingUser.email },
  });
};

exports.logout = async (req, res) => {
  res.clearCookie("refreshToken", { path: "/api/auth/refresh-token" });
  res.json({ message: "Logged out" });
};

exports.refreshToken = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });
    const newAccessToken = generateToken({ id: decoded.id });
    res.json({
      accessToken: newAccessToken,
      user: { id: decoded.id },
    });
  });
};
