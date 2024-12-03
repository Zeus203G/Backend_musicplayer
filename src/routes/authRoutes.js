const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Đăng ký
router.post('/register', authController.register);

// Đăng nhập
router.post('/login', authController.login);

router.delete('/auth/delete/:userId', authController.deleteUser);

module.exports = router;
