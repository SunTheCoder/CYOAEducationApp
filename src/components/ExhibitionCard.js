import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { Linking } from 'react-native';


const ExhibitionCard = ({ title, description, imageUrl, link, surveyLink, optionLink, adminSurveyLink }) => {
  const navigation = useNavigation();
  const [isAdmin, setIsAdmin] = useState(false);

  // Function to check if the user is an admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await fetch('http://localhost:5000/api/auth/check-admin', {
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
      {link && (
      <View style={styles.button}>
        <Button
          
          title="Learn More"
          onPress={() => Linking.openURL(link)}
          />
        </View>
      )}
      {surveyLink && (
      <View style={styles.button}>
        
        <Button
          title="Survey"
          onPress={() => Linking.openURL(surveyLink)}
          />
        </View>
      )}
      {optionLink && (
      <View style={styles.button}>
        
        <Button
          title="Interactive Features & Resources"
          onPress={() => Linking.openURL(optionLink)}
          />
        </View>
      )}
      {isAdmin && (
        <View style={styles.button}>
          <Button
          title="Survey Edit Link"
          onPress={() => Linking.openURL(adminSurveyLink)}
          />
        </View>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
  }
});

export default ExhibitionCard;
