import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  // Set up state for the counter
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
        <View style={styles.textWrapper}>
            <Text style={styles.title}>Welcome to {'\n'} the {'\n'} Longwood Center of Visual Arts</Text>
            <Text style={styles.counter}>Count: {count}</Text>
        </View>
      {/* Button to increment the count */}
      <Button title="Increase Count" onPress={() => setCount(count + 1)} />
        <View style={styles.logWrapper}>
            <Button title="Login" />
            <Button title="SignUp" />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textWrapper: {
    padding: 20, // Add padding to the wrapper
    backgroundColor: '#fff', // Background color for the wrapper
    borderRadius: 10, // Round the edges of the wrapper (optional)
    
  },
  logWrapper: {
    flexDirection: 'row', // Arrange the buttons horizontally
    justifyContent:'space-between', // Add space between the buttons
    padding: 20, // Add padding to the wrapper
    width: 175
    
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
    textAlign: 'center'
  },
  counter: {
    fontSize: 18,
    marginBottom: 20,
  },
 
});

