import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage'; // To store the token

import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig.extra.apiUrl;

const LoginSignupModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // For signup
  


  const handleLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Send email and password in the request
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data.token);

        // Store the token in AsyncStorage
        await AsyncStorage.setItem('token', data.token);
        console.log('Token saved to AsyncStorage:', data.token);

        // Navigate to the home page, passing `isAdmin` to the route
        navigation.navigate('Home', { isAdmin: data.isAdmin });
      } else {
        console.log('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }), // Send username, email, and password in the request
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Signup successful:', data.token);

        // Store the token in AsyncStorage
        await AsyncStorage.setItem('token', data.token);
        console.log('Token saved to AsyncStorage:', data.token);

        // Navigate to the home page after a successful signup
        navigation.navigate('Home', { isAdmin: data.isAdmin });
      } else {
        console.log('Signup failed:', data.message);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  const handleSubmit = () => {
    if (isLogin) {
      console.log(`Logging in with Username: ${username}, Password: ${password}`);
      handleLogin();
    } else {
      handleSignup();
      console.log(`Signing up with Email: ${email}, Username: ${username}, Password: ${password}`);
    }
    setModalVisible(false); // Close modal after submission
  };

  return (
    <View style={styles.container}>
      <Button
        title="Login / Signup"
        onPress={() => setModalVisible(true)}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{isLogin ? "Login" : "Sign Up"}</Text>

            {!isLogin && (
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Button
              title={isLogin ? "Login" : "Sign Up"}
              onPress={handleSubmit}
              buttonStyle={styles.submitButton}
            />
            <TouchableOpacity
              onPress={() => setIsLogin(!isLogin)}
              style={styles.toggleButton}
            >
              <Text style={styles.toggleText}>
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#2196F3',
    marginTop: 10,
  },
  toggleButton: {
    marginTop: 15,
  },
  toggleText: {
    color: '#2196F3',
    fontSize: 14,
  },
  closeButton: {
    marginTop: 15,
  },
  closeText: {
    color: '#2196F3',
    fontSize: 16,
  },
});

export default LoginSignupModal;
