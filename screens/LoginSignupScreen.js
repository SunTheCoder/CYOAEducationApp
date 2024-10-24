import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';


const LoginSignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
//   const [count, setCount] = useState(0);

  // Function to handle login
  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.1.159:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password in the request
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data.token); // Handle successful login (e.g., store token)
        navigation.navigate('Home'); // Navigate to the home page after a successful signup
      } else {
        console.log('Login failed:', data.message); // Handle login failure
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  // Function to handle signup
  const handleSignup = async () => {
    try {
      const response = await fetch('http://192.168.1.159:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }), // Send email and password in the request
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Signup successful:', data.token); // Handle successful signup (e.g., store token)
        navigation.navigate('Home'); // Navigate to the home page after a successful signup
      } else {
        console.log('Signup failed:', data.message); // Handle signup failure
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the {'\n'} Longwood Center for the Visual Arts</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
}

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