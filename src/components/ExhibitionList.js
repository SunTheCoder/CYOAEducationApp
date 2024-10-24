// src/components/ExhibitionList.js
import React from 'react';
import { SectionList, Text, View, StyleSheet } from 'react-native';
import ExhibitionCard from './ExhibitionCard'; // Import your exhibition item component

const ExhibitionList = ({ sections = [] }) => {
  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ExhibitionCard
          title={item.title}
          description={item.description}
          imageUrl={item.imageUrl}
        />
      )}
      // renderSectionHeader={({ section: { title } }) => (
      //   <Text style={styles.header}>{title}</Text>
      // )}
      ListEmptyComponent={<Text>No Exhibitions Available</Text>} // Handle empty data
    />
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
});

export default ExhibitionList;
