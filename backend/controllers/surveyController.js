const { Survey, SurveyQuestion, SurveyResponse } = require('../models');

// Create a new survey
exports.createSurvey = async (req, res) => {
    const { exhibitionId, title, questions } = req.body;
  
    try {
      const survey = await Survey.create({ title, exhibitionId });
  
      const questionPromises = questions.map((question) => {
        return SurveyQuestion.create({
          surveyId: survey.id,
          questionType: question.type,
          questionText: question.text,
          options: question.options && Array.isArray(question.options) ? question.options : [], // Ensure options is an array
        });
      });
  
      await Promise.all(questionPromises);
  
      res.status(201).json(survey);
    } catch (error) {
      console.error('Error creating survey:', error);
      res.status(500).json({ message: 'Error creating survey', error });
    }
  };
  




// Get all surveys and their responses for a specific exhibition
exports.getSurveysByExhibitionId = async (req, res) => {
    const { exhibitionId } = req.params;
    console.log('Fetching surveys for exhibitionId:', exhibitionId); // Log exhibitionId
  
    try {
      const surveys = await Survey.findAll({
        where: { exhibitionId },
        include: [
          {
            model: SurveyQuestion,
            include: [
              {
                model: SurveyResponse,
              },
            ],
          },
        ],
      });
  
      if (!surveys.length) {
        console.log('No surveys found for this exhibition');
        return res.status(404).json({ message: 'No surveys found for this exhibition' });
      }
  
      res.status(200).json(surveys);
    } catch (error) {
      console.error('Error fetching surveys:', error); // Log the error
      res.status(500).json({ message: 'Error fetching surveys', error });
    }
  };
  