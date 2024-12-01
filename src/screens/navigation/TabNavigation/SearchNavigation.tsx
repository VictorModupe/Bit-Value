import React from 'react';
import { View, Text } from 'react-native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../../tabs/search/SearchScreen';

const Stack = createStackNavigator();

const SearchNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false,
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: true,
        gestureEnabled:true,
        gestureDirection:"horizontal",
      }}>
        <Stack.Screen name='Search' component={SearchScreen}/>
      </Stack.Navigator>
  );
};

export default SearchNavigation;
