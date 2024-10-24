// controllers/adminController.js

const User = require('../models/User');

exports.checkAdmin = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id); // `req.user.id` is set by the authentication middleware

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ isAdmin: user.isAdmin });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
