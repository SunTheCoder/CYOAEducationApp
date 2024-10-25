const express = require('express');
const { createSurvey } = require('../controllers/surveyController');
const { getSurveysByExhibitionId } = require('../controllers/surveyController');

const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createSurvey);

router.get('/:exhibitionId', authMiddleware, getSurveysByExhibitionId);

module.exports = router;
