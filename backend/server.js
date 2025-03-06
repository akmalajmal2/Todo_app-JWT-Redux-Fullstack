const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const csrfProtection = require("./middlewares/csrfProtection");
const authRoutes = require("./router/authRoutes");

const todoRoutes = require("./router/todoRoutes");

const app = express();
app.use(helmet());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
// app.use(csrfProtection);
app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);
app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port:${process.env.PORT || 5000}`)
);
