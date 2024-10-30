import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import Constants from 'expo-constants';

const BASE_URL = Constants.manifest.extra.apiUrl;

const CreateExhibitionScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleCreateExhibition = async () => {
    const urlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/;

    if (!urlRegex.test(imageUrl)) {
        console.log('Invalid image URL');
        alert('Please provide a valid image URL');
        return;
    }

    try {
      // Retrieve the token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      
      if (!token) {
        console.log('No token found');
        return;
      }

      const response = await fetch(`${BASE_URL}/api/exhibitions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Send token to authorize
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Exhibition created:', data);
        navigation.navigate('Home', { newExhibition: data }); // Pass new exhibition data
      } else {
        console.log('Failed to create exhibition:', data.message);
      }
    } catch (error) {
      console.error('Error creating exhibition:', error);
    }
  };

  return (
    <View style={styles.container}>
        
      <Text style={styles.title}>Create New Exhibition</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
        style={styles.input}
      />
      <Button title="Create Exhibition" onPress={handleCreateExhibition} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
});

export default CreateExhibitionScreen;
