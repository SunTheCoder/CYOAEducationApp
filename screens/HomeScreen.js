// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ExhibitionList from '../src/components/ExhibitionList'; // Import ExhibitionList
import exhibitionsData from '../src/data/ExhibitionData'; // Import the exhibition data

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Current Exhibitions</Text>
      {/* Pass the exhibitionsData prop */}
      <ExhibitionList sections={exhibitionsData} />
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
