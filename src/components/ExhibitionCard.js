import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';


const ExhibitionCard = ({ title, description, imageUrl, link, surveyLink, optionLink }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.itemContainer}>
      {/* Ensure imageUrl is wrapped in the correct object structure */}
      <View>

      <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
    <View>
      <Text style={styles.title}>{title}</Text>
    </View>
    <View>

      <Text style={styles.description}>{description}</Text>
    </View>
      {link && (
      <View style={styles.button}>
        <Button
          
          title="Learn More"
          onPress={() => Linking.openURL(link)}
          />
        </View>
      )}
      {surveyLink && (
      <View style={styles.button}>
        
        <Button
          title="Survey"
          onPress={() => Linking.openURL(surveyLink)}
          />
        </View>
      )}
      {optionLink && (
      <View style={styles.button}>
        
        <Button
          title="Interactive Features & Resources"
          onPress={() => Linking.openURL(optionLink)}
          />
        </View>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  }
});

export default ExhibitionCard;
