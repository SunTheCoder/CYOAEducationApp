'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Find the exhibition you want to link the survey to
    const [exhibition] = await queryInterface.sequelize.query(
      `SELECT id FROM "Exhibitions" LIMIT 1;`
    );

    const exhibitionId = exhibition[0].id;

    // Insert a survey linked to the exhibition
    await queryInterface.bulkInsert('Surveys', [
      {
        exhibitionId,
        title: 'Visitor Feedback Survey',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const [survey] = await queryInterface.sequelize.query(
      `SELECT id FROM "Surveys" WHERE "exhibitionId" = ${exhibitionId} LIMIT 1;`
    );

    const surveyId = survey[0].id;

    // Insert some questions for the survey
    await queryInterface.bulkInsert('SurveyQuestions', [
      {
        surveyId,
        questionType: 'multiple_choice',
        questionText: 'How did you enjoy the exhibition?',
        // Properly format array for PostgreSQL using curly braces
        options: '{Loved it,It was good,It was okay,Not my style}', 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        surveyId,
        questionType: 'rating_scale',
        questionText: 'How would you rate the exhibition overall?',
        options: null, // Rating scale doesn't need options
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        surveyId,
        questionType: 'free_text',
        questionText: 'What improvements would you suggest?',
        options: null, // Free text doesn't need options
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SurveyQuestions', null, {});
    await queryInterface.bulkDelete('Surveys', null, {});
  },
};
