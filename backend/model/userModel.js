const db = require("../config/db");

class User {
  static async findUserByemail(email) {
    const [rows] = await db.execute("SELECT * FROM user_data WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }
  static async createUser(name, email, password) {
    return db.execute(
      "INSERT INTO user_data(name,email,password) VALUES(?,?,?)",
      [name, email, password]
    );
  }
}

module.exports = User;
