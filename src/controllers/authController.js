const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  // Kiểm tra xem các trường có đầy đủ không
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Kiểm tra nếu email đã tồn tại
    const userEmailExists = await User.findUserByEmail(email);
    if (userEmailExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Kiểm tra nếu username đã tồn tại
    const userNameExists = await User.findUserByUsername(username);
    if (userNameExists) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const userId = await User.createUser(username, email, hashedPassword);

    // Thông báo đăng ký thành công
    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Tìm người dùng trong cơ sở dữ liệu
    const user = await User.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // So sánh mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Tạo token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      'your_secret_key', // Thay bằng khóa bí mật thật sự
      { expiresIn: '1h' } // Thời gian hết hạn token
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const result = await User.deleteUserById(userId);
    if (result) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};
