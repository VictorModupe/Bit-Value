import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Text } from 'react-native';
import NewsScreen from "@/src/screens/tabs/news/NewsScreen";
import NewsDetailsScreen from '../../stacks/NewsDetailsScreen';


const Stack = createStackNavigator();

const NewsNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false,
        ...TransitionPresets.SlideFromRightIOS,
        ...TransitionPresets.FadeFromRightAndroid,
        animationEnabled: true,
        gestureEnabled:true,
        gestureDirection:"horizontal",
      }}>
      <Stack.Screen name='News' component={NewsScreen} />
      <Stack.Screen name='NewsDetails' component={NewsDetailsScreen} />
    </Stack.Navigator>
  );
};
export default NewsNavigation;
