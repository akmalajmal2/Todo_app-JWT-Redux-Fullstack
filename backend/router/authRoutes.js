const express = require("express");
const router = express.Router();
const limiter = require("../middlewares/rateLimiter");
const {
  register,
  login,
  logout,
  refreshToken,
} = require("../controller/authController");
router.post("/register", register);
router.post("/login", limiter, login);
router.post("/logout", limiter, logout);
router.get("/refresh-token", refreshToken);
module.exports = router;
