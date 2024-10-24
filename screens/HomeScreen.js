import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import ExhibitionList from '../src/components/ExhibitionList'; // Import ExhibitionList
import AsyncStorage from '@react-native-async-storage/async-storage'; // To store the token

const HomeScreen = ({ navigation, route }) => {
  const [isAdmin, setIsAdmin] = useState(false); // To check if the user is an admin
  const [exhibitionsData, setExhibitionsData] = useState([]); // State to hold fetched exhibitions data

  // Function to check if the user is an admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await fetch('http://localhost:5000/api/auth/check-admin', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setIsAdmin(data.isAdmin);
      }
    };
    checkAdminStatus(); 
  }, []);

  // Fetch exhibitions from backend
  useEffect(() => {
    const fetchExhibitions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/exhibitions');
        const data = await response.json();
  
        // Manually grouping into sections on the frontend
        const sections = [
          {
            
            data: data.slice(0, 2), // Assuming first 2 are current
          },
          {
            
            data: data.slice(2), // Rest are upcoming
          },
        ];
  
        setExhibitionsData(sections); // Set the grouped data to the state
      } catch (error) {
        console.error('Error fetching exhibitions:', error);
      }
    };
  
    fetchExhibitions();
  }, []);
  

  // Adding newly created exhibition from CreateExhibitionScreen
  useEffect(() => {
    if (route.params?.newExhibition) {
      setExhibitionsData((prevData) => [...prevData, route.params.newExhibition]);
    }
  }, [route.params?.newExhibition]);

  return (
    <View style={styles.container}>
      <View>
        <ExhibitionList sections={exhibitionsData} /> {/* Display fetched exhibitions */}
    </View>
      {isAdmin && (
    <View>
        <Button
          title="Create New Exhibition"
          onPress={() => navigation.navigate('CreateExhibition')} // Navigate to Create Exhibition Screen
        />
    </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 24,
  },
});

export default HomeScreen;
