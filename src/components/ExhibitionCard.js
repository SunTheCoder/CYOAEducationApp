import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';


const ExhibitionCard = ({ title, description, imageUrl, link }) => {
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
      <View>
        <Button
          title="Learn More"
          onPress={() => Linking.openURL(link)}
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
});

export default ExhibitionCard;
