import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import HomeScreen from './screens/HomeScreen';
import LoginSignupScreen from './screens/LoginSignupScreen';
import CreateExhibitionScreen from './screens/CreateExhibitionScreen';
import CreateSurveyScreen from './screens/CreateSurveyScreen';
import SurveyViewScreen from './screens/SurveyViewScreen';
import SurveyScreen from './screens/SurveyScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer> {/* Wrap your stack navigator inside NavigationContainer */}
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="LoginSignup" component={LoginSignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateExhibition" component={CreateExhibitionScreen} />
        <Stack.Screen name="CreateSurvey" component={CreateSurveyScreen} />
        <Stack.Screen name="SurveyView" component={SurveyViewScreen} />
        <Stack.Screen name="SurveyScreen" component={SurveyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
