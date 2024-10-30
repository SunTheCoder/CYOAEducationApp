import React, { useState } from 'react';
import { View, TextInput, Button, Text, Picker, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // To store the token
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig.extra.apiUrl;


const CreateSurveyScreen = ({ navigation }) => {
  const [surveyTitle, setSurveyTitle] = useState(''); // New state for survey title
  const [exhibitionId, setExhibitionId] = useState('');
  const [questions, setQuestions] = useState([{ text: '', type: 'free_text', options: [] }]); // Include options array for multiple choice/dropdown

  // Function to add new survey item dynamically
  const addQuestion = () => {
    setQuestions([...questions, { text: '', type: 'free_text', options: [] }]); // Add new question with default type 'text'
  };

  // Function to handle changes in question input
  const handleQuestionChange = (text, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = text;
    setQuestions(updatedQuestions);
  };

  // Function to handle changes in question type
  const handleQuestionTypeChange = (type, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = type;

    // Reset options if type changes
    if (type !== 'multiple_choice' && type !== 'dropdown') {
      updatedQuestions[index].options = [];
    }
    setQuestions(updatedQuestions);
  };

  // Function to handle options for multiple choice/dropdown questions
  const handleOptionChange = (option, questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = option;
    setQuestions(updatedQuestions);
  };

  // Function to add a new option for multiple choice/dropdown
  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push(''); // Add empty option
    setQuestions(updatedQuestions);
  };

  // Handle survey creation submission
  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return;
      }
  
      const surveyData = {
        exhibitionId,
        title: surveyTitle, // Make sure to pass the survey title
        questions: questions.map((q) => ({
          text: q.text,
          type: q.type,
          options: q.type === 'multiple_choice' || q.type === 'dropdown' ? q.options || [] : [], // Ensure options is an array for specific types
        })),
      };
  
      const response = await fetch(`${BASE_URL}/api/surveys`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(surveyData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Survey created successfully:', data);
        navigation.navigate('SurveyView');
      } else {
        console.log('Failed to create survey:', await response.json());
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
    }
  };
  
  
  
  
  return (
    <ScrollView style={styles.container}>
      <TextInput
        placeholder="Survey Title"
        value={surveyTitle}
        onChangeText={setSurveyTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Exhibition ID"
        value={exhibitionId}
        onChangeText={setExhibitionId}
        style={styles.input}
      />

      {questions.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <TextInput
            placeholder="Enter question"
            value={question.text}
            onChangeText={(text) => handleQuestionChange(text, index)}
            style={styles.input}
          />

          <Picker
            selectedValue={question.type}
            style={styles.picker}
            onValueChange={(itemValue) => handleQuestionTypeChange(itemValue, index)}
          >
            
            <Picker.Item label="Multiple Choice" value="multiple_choice" />
            <Picker.Item label="Star Rating" value="star_rating" />
            <Picker.Item label="Free Text Response" value="free_text" />
            <Picker.Item label="Dropdown" value="dropdown" />
          </Picker>

          {(question.type === 'multiple_choice' || question.type === 'dropdown') && (
            <View>
              {question.options.map((option, optionIndex) => (
                <TextInput
                  key={optionIndex}
                  placeholder={`Option ${optionIndex + 1}`}
                  value={option}
                  onChangeText={(text) => handleOptionChange(text, index, optionIndex)}
                  style={styles.input}
                />
              ))}
              <Button title="Add Option" onPress={() => addOption(index)} />
            </View>
          )}
        </View>
      ))}

      <Button title="Add Survey Item" onPress={addQuestion} />
      <Button title="Submit Survey" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  questionContainer: {
    marginBottom: 20,
  },
});

export default CreateSurveyScreen;
