import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig?.extra?.apiUrl || Constants.manifest?.extra?.apiUrl


const SurveyViewScreen = () => {
  const [exhibitionId, setExhibitionId] = useState('');
  const [surveys, setSurveys] = useState([]);
  const [error, setError] = useState(null);
 

  // Function to fetch surveys for a given exhibition ID
  const fetchSurveys = async () => {
    try {
      // Retrieve token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setError('Authentication token not found.');
        return;
      }

      const response = await fetch(`${BASE_URL}/api/surveys/${exhibitionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      
      if (response.ok) {
        setSurveys(data);
        setError(null);
      } else {
        setError(data.message || 'Failed to fetch surveys');
        setSurveys([]);
      }
    } catch (error) {
      setError('Error fetching surveys');
      setSurveys([]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        placeholder="Enter Exhibition ID"
        value={exhibitionId}
        onChangeText={setExhibitionId}
        style={styles.input}
      />
      <Button title="Fetch Surveys" onPress={fetchSurveys} />

      {error && <Text style={styles.error}>{error}</Text>}

      {/* Display fetched surveys */}
      {surveys.length > 0 && surveys.map((survey, index) => (
        <View key={index} style={styles.surveyContainer}>
          <Text style={styles.surveyTitle}>Survey {index + 1}</Text>
          {survey.SurveyQuestions.map((question, qIndex) => (
            <View key={qIndex} style={styles.questionContainer}>
              <Text style={styles.questionText}>{question.questionText}</Text>
              {question.SurveyResponses.map((response, rIndex) => (
                <Text key={rIndex} style={styles.responseText}>Response: {response.response}</Text>
              ))}
            </View>
          ))}
        </View>
      ))}

      {surveys.length === 0 && !error && (
        <Text>No surveys found for this exhibition</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  surveyContainer: {
    marginBottom: 20,
  },
  surveyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  questionContainer: {
    marginBottom: 10,
  },
  questionText: {
    fontSize: 16,
  },
  responseText: {
    fontSize: 14,
    color: 'gray',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default SurveyViewScreen;
