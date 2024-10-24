const express = require('express');
const { createExhibition, getExhibitions  } = require('../controllers/exhibitionController');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware to verify token
const router = express.Router();

router.post('/', authMiddleware, createExhibition);

router.get('/', getExhibitions);

module.exports = router;
