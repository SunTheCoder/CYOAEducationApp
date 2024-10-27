import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import ExhibitionList from '../src/components/ExhibitionList'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-web';

const HomeScreen = ({ navigation, route }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [exhibitionsData, setExhibitionsData] = useState([]);

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
  }, [route.params?.isAdmin]);

  const handleGuest = async () => {
    await AsyncStorage.removeItem('token');
    setIsAdmin(false);
    Alert.alert("Guest Access", "You are now browsing as a guest.");
  };

  const navigateToLogin = () => {
    navigation.navigate('LoginSignup');
  };

  const navigateToSignup = () => {
    navigation.navigate('LoginSignup');
  };

  useEffect(() => {
    const fetchExhibitions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/exhibitions');
        const data = await response.json();
        console.log(data)

        const sections = [
          { data: data.slice(0, 2) },
          { data: data.slice(2) },
        ];

        setExhibitionsData(sections);
      } catch (error) {
        console.error('Error fetching exhibitions:', error);
      }
    };

    fetchExhibitions();
  }, []);

  return (
    <ScrollView>
    <View style={styles.container}>
      
          <Text style={styles.title}>Welcome to the{'\n'}Longwood Center for the Visual Arts{'\n'}Portal</Text>
       <View style={styles.loginSignupBox}>
          <Button title="Login" onPress={navigateToLogin} />
          <Button title="Signup" onPress={navigateToSignup} />
      </View>

      {isAdmin && (
        <View style={styles.adminContainer}>
          <Button title="Create New Exhibition" onPress={() => navigation.navigate('CreateExhibition')} />
          <Button title="Create New Survey" onPress={() => navigation.navigate('CreateSurvey')} />
          <Button title="View Surveys" onPress={() => navigation.navigate('SurveyView')} />
        </View>
      )}
      
      <Button title="Tester" onPress={() => navigation.navigate('SurveyScreen')} />
     

      <ExhibitionList sections={exhibitionsData} />
      
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  adminContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  loginSignupBox: {
    width: 200,
    paddingBottom: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default HomeScreen;
