import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ExhibitionCard = ({ title, description, imageUrl, link }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.itemContainer}>
      <Image source={imageUrl} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {link && (
        <Button
          title="Learn More"
          onPress={() => navigation.navigate(link)} // Optional navigation
        />
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
});

export default ExhibitionCard;
 