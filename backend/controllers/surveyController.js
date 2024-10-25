const { Survey, Question } = require('../models');

// Create a new survey
exports.createSurvey = async (req, res) => {
  const { exhibitionId, questions } = req.body;

  try {
    // Create a survey linked to an exhibition
    const survey = await Survey.create({ exhibitionId });

    // Create questions for the survey
    const questionPromises = questions.map((questionText) =>
      Question.create({ text: questionText, surveyId: survey.id })
    );
    await Promise.all(questionPromises);

    res.status(201).json(survey);
  } catch (error) {
    res.status(500).json({ message: 'Error creating survey', error });
  }
};
