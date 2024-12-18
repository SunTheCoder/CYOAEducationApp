import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import ExhibitionList from '../src/components/ExhibitionList'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Linking } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import LoginSignupModal from '../src/components/LoginSignupModal';

import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig?.extra?.apiUrl || Constants.manifest?.extra?.apiUrl


const HomeScreen = ({ navigation, route }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [exhibitionsData, setExhibitionsData] = useState([]);
  
  console.log(BASE_URL)

  // Function to check if the user is an admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true)
        const response = await fetch(`${BASE_URL}/api/auth/check-admin`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        console.log('isAdmin',data)
        setIsAdmin(data.isAdmin);
      }
    };
    checkAdminStatus();
  }, [route.params?.isAdmin]);

  const handleGuest = async () => {
    await AsyncStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsAdmin(false);
    Alert.alert("Guest Access", "You are now browsing as a guest.");
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsAdmin(false);
    Alert.alert("Logged Out", "You have successfully logged out.");
    navigation.replace('Home');
  };


  const reloadPage = () => {
    navigation.replace('Home'); // Replace the current screen with itself
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
        const response = await fetch(`${BASE_URL}/api/exhibitions`);
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
    
    <View style={styles.container}>
        
        <View style={{backgroundColor: 'lightgrey', width: '100%', paddingTop: 20, paddingBottom: 15}}>
          <Text style={{textAlign: 'center'}}>Welcome to the</Text>
          <Text style={styles.title}>Longwood Center for the Visual Arts</Text>
        </View>
<View style={{borderWidth: 1,
    borderColor: 'black', width: '100%', }}></View>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 35}}>Current Exhibitions</Text>

          
          
         <ExhibitionList sections={exhibitionsData} />
         
       <View style={styles.loginSignupBox}>
          {!isLoggedIn ? (
            <LoginSignupModal navigation={navigation} />

            // Show Login/Signup modal button if not logged in

          ) : (
            // Show Logout button if logged in
            
            

            <TouchableOpacity style={{ width: 60, backgroundColor: 'red', borderRadius: 5 }} onPress={handleLogout}>
                <Text style={{textAlign: 'center', padding: 5, color: 'white'}}>Logout</Text>
            </TouchableOpacity>
          
          )}
        </View>

      {isAdmin && (
        <View style={styles.adminContainer}>
          

          <TouchableOpacity style={styles.adminButtons} onPress={() => navigation.navigate('CreateExhibition')}>

            <Text>Create New Exhibition</Text>
          </TouchableOpacity>




         

          <TouchableOpacity style={styles.adminButtons} onPress={() => Linking.openURL('https://docs.google.com/forms/u/0/create')}>

            <Text>Create New Survey</Text>
          </TouchableOpacity>

          
         
        </View>
      )}
      
      
     

      
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
    
    
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    // marginBottom: 60,
    textAlign: 'center',
    
  },
  adminContainer: {
    
    backgroundColor: 'lightgrey',
    width: '100%',
    paddingBottom: 30,
    alignItems: 'center',
    // flexDirection: 'row',
    // justifyContent: 'space-evenly'
    
    
  },
  adminButtons: {
    padding: 5,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    marginBottom: 10

  },
  loginSignupBox: {
    width: '100%',
    paddingTop: 15,
    paddingBottom: 20,
    
    backgroundColor: 'lightgrey',
    // alignItems: 'center',
    
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  

});

export default HomeScreen;
