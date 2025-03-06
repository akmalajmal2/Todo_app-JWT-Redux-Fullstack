const Todo = require("../model/todoModel");

exports.getAllTodos = async (req, res) => {
  try {
    const { id } = req.params;
    const todos = await Todo.getAllTodos(id);
    res.status(200).json(todos);
  } catch (error) {
    console.log("error fetching todos", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { title, description, user_id } = req.body;
    const newTodo = await Todo.addTodo(title, description, user_id);
    res.status(201).json({ message: "Todo added successfully", todo: newTodo });
  } catch (error) {
    console.log("error fetching todos", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateTodos = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    console.log("controllersss", id, title, description);
    const updateTodo = await Todo.updateTodo(title, description, id);
    if (!updateTodo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json({ message: "Todo Updated successfully" });
  } catch (error) {
    console.log("error fetching todos", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteTodos = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Todo.deleteTodo(id);
    if (!deleted) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json({ message: "Todo Deleted successfully" });
  } catch (error) {
    console.log("error fetching todos", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
