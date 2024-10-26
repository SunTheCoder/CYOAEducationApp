import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const LoginSignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleGuest = async () => {
    await AsyncStorage.removeItem('token'); // Ensure no token is stored
    navigation.navigate('Home', { isAdmin: false });
  };
  

  // Function to handle login
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password in the request
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

  // Function to handle signup
  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the {'\n'} Longwood Center for the Visual Arts</Text>
      <View>
        <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
        />
      </View>
      <View>
        <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
        />
      </View>
      <View>
        <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
        />
      </View>
      <Button title="Login" onPress={handleLogin} />
      <Button title="Signup" onPress={handleSignup} />
      <Button title="Guest" onPress={handleGuest} />
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

export default LoginSignupScreen;
