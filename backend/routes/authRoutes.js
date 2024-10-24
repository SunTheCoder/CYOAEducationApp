const express = require('express');
const { signup, login } = require('../controllers/authController');
const { checkAdmin } = require('../controllers/adminController'); // New controller for checking admin
const authenticate = require('../middlewares/authMiddleware'); // Middleware to verify token

const router = express.Router();

// Signup and login routes
router.post('/signup', signup);
router.post('/login', login);

// Check admin status (this is the new route)
router.get('/check-admin', authenticate, checkAdmin);

module.exports = router;