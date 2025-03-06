const db = require("../config/db");

class Todo {
  static async getAllTodos(id) {
    try {
      const [rows] = await db.execute("SELECT * FROM todos where user_id=?", [
        id,
      ]);
      return rows;
    } catch (error) {
      console.error("Error in getAllTodos:", error);
      throw new Error("Database error");
    }
  }
  static async addTodo(title, description, user_id) {
    try {
      console.log("newww", title, description, user_id);
      const [result] = await db.execute(
        "INSERT INTO todos(title,description,status,user_id) VALUES(?,?,?,?)",
        [title, description, false, Number(user_id)]
      );
      return { id: result.insertId, title, description, status: false };
    } catch (error) {
      console.error("Error in createTodo:", error);
      throw new Error("Database error");
    }
  }

  static async updateTodo(title, description, id) {
    try {
      const [result] = await db.execute(
        "UPDATE todos set title=?, description=? where id=?",
        [title, description, Number(id)]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error in Updating Todo:", error);
      throw new Error("Database error");
    }
  }
  static async deleteTodo(id) {
    try {
      const [result] = await db.execute("DELETE FROM todos WHERE id=?", [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error in deleteTodo:", error);
      throw new Error("Database error");
    }
  }
}

module.exports = Todo;
