import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  // States for email, password, and count
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [count, setCount] = useState(0);

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
        console.log('Login successful:', data.token); // Handle successful login (e.g., store token)
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
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }), // Send email and password in the request
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Signup successful:', data.token); // Handle successful signup (e.g., store token)
      } else {
        console.log('Signup failed:', data.message); // Handle signup failure
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>
          Welcome to {'\n'} the {'\n'} Longwood Center of Visual Arts
        </Text>
        <Text style={styles.counter}>Count: {count}</Text>
      </View>

      {/* Button to increment the count */}
      <Button title="Increase Count" onPress={() => setCount(count + 1)} />

      {/* Input fields for email and password */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername} // Set email state
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail} // Set email state
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword} // Set password state
      />

      {/* Login and Signup buttons */}
      <View style={styles.logWrapper}>
        <Button title="Login" onPress={handleLogin} />
        <Button title="SignUp" onPress={handleSignup} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textWrapper: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  logWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    width: 175,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  counter: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 200,
  },
});
