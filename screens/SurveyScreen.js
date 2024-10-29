
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
// require('dotenv').config();


// const BASE_URL = process.env.REACT_APP_API_URL;

const SurveyScreen = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://docs.google.com/forms/d/e/1FAIpQLScU3PsVCtCWAzyHbxIqa7yf-yK1A2OLYW0R500ZWyZbAp91CQ/viewform?usp=sf_link' }}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default SurveyScreen;