const express = require("express");
const router = express.Router();
const limiter = require("../middlewares/rateLimiter");
const {
  getAllTodos,
  createTodo,
  updateTodos,
  deleteTodos,
} = require("../controller/todoController");
router.get("/:id", getAllTodos);
router.post("/", limiter, createTodo);
router.put("/:id", limiter, updateTodos);
router.delete("/:id", deleteTodos);
module.exports = router;
