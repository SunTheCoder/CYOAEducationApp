import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';

const CreateSurveyScreen = ({ navigation }) => {
  const [exhibitionId, setExhibitionId] = useState('');
  const [questions, setQuestions] = useState([{ text: '' }]); // Initially one question

  // Function to add new question dynamically
  const addQuestion = () => {
    setQuestions([...questions, { text: '' }]); // Add new question
  };

  // Function to handle changes in question input
  const handleQuestionChange = (text, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = text;
    setQuestions(updatedQuestions);
  };

  // Handle survey creation submission
  const handleSubmit = () => {
    // Send survey data (exhibitionId, questions array) to the backend
    console.log('Submitting survey with ID:', exhibitionId);
    console.log('Survey Questions:', questions);
    // Add your logic to send data to the backend here
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create New Survey</Text>

      {/* Input for Exhibition ID */}
      <TextInput
        placeholder="Exhibition ID"
        value={exhibitionId}
        onChangeText={setExhibitionId}
        style={styles.input}
      />

      {/* Render questions dynamically */}
      {questions.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <TextInput
            placeholder={`Question ${index + 1}`}
            value={question.text}
            onChangeText={(text) => handleQuestionChange(text, index)}
            style={styles.input}
          />
        </View>
      ))}

      {/* Button to add more questions */}
      <Button title="Add Question" onPress={addQuestion} />

      {/* Submit button */}
      <Button title="Submit Survey" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  questionContainer: {
    marginBottom: 10,
  },
});

export default CreateSurveyScreen;
