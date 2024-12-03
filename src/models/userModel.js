const db = require('../config/db');

// Tạo người dùng mới
exports.createUser = async (username, email, hashedPassword) => {
  const [result] = await db.execute(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword]
  );
  return result.insertId;
};

// Tìm người dùng qua email
exports.findUserByEmail = async (email) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0]; // Trả về người dùng nếu tìm thấy, nếu không trả về undefined
};

// Tìm người dùng qua username
exports.findUserByUsername = async (username) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0]; // Trả về người dùng nếu tìm thấy, nếu không trả về undefined
};
// xóa người dùng 
exports.deleteUserById = async (userId) => {
  const [result] = await db.execute('DELETE FROM users WHERE id = ?', [userId]);
  return result.affectedRows > 0; // Nếu xóa thành công, trả về true, ngược lại false
};