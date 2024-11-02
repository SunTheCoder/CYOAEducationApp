import React from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { Linking } from 'react-native';

import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig?.extra?.apiUrl || Constants.manifest?.extra?.apiUrl



const ExhibitionCard = ({ title, description, imageUrl, link, surveyLink, optionLink, adminSurveyLink }) => {
  const navigation = useNavigation();
  const [isAdmin, setIsAdmin] = useState(false);

  // Function to check if the user is an admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await fetch(`${BASE_URL}/api/auth/check-admin`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setIsAdmin(data.isAdmin);
      }
    };
    checkAdminStatus();
  }, []);

  return (
    <View style={styles.itemContainer}>
    
      <View>

      <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
    <View>
      <Text style={styles.title}>{title}</Text>
    </View>
    <View>

      <Text style={styles.description}>{description}</Text>
    </View>

    <View style={styles.buttonContainer}>
      {link && (
      <View style={styles.button}>
        <TouchableOpacity onPress={() => Linking.openURL(link)}>
          
          <Text style={styles.buttonText}>Learn More</Text>
          
          
        </TouchableOpacity>  
        </View>
      )}
      {surveyLink && (
      <View style={styles.button}>
        
        <TouchableOpacity onPress={() => Linking.openURL(surveyLink)}>
          <Text style={styles.buttonText}>Survey</Text>
          
        </TouchableOpacity>  
        </View>
      )}
      {optionLink && (
      <View style={styles.button}>
        
        <TouchableOpacity onPress={() => Linking.openURL(optionLink)}>
          <Text style={styles.buttonText}>Interactive Features & Resources</Text>
          
        </TouchableOpacity>  
        </View>
      )}
      {isAdmin && (
        <View style={styles.button}>
          <TouchableOpacity onPress={() => Linking.openURL(adminSurveyLink)}>
            <Text style={styles.buttonText}>Survey Edit Link</Text>
          
          </TouchableOpacity>
        </View>
      )}
      
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#2196F3',
    padding: 5,
    borderRadius: 5,
    
  
    


  },
  buttonText: {
    color: 'white',
    
    textAlign: 'center',
  }
});

export default ExhibitionCard;
