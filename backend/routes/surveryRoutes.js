const express = require('express');
const { createSurvey } = require('../controllers/surveyController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createSurvey);

module.exports = router;
