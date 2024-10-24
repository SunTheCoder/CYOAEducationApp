import React from 'react';
import { SectionList, Text, View, StyleSheet } from 'react-native';
import ExhibitionCard from './ExhibitionCard'; 

const ExhibitionList = ({ sections = [] }) => {
  return (
    <View>
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id} 
      renderItem={({ item }) => (
      <View>
        <ExhibitionCard
          title={item.title}
          description={item.description}
          imageUrl={item.imageUrl}
        />
      </View>
      )}
      
      renderSectionHeader={({ section: { title } }) => (
        <View>
          <Text style={styles.header}>{title}</Text>
        </View>
      )}
      ListEmptyComponent={
        <View>
          <Text>No Exhibitions Available</Text>
        </View>
      }
    />
    </View>
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
