import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Text } from 'react-native';
import HomeScreen from "../../tabs/home/HomeScreen";
import CoinDetailsScreen from "../../stacks/CoinDetailsScreen";

const Stack = createStackNavigator();

const HomeNavigation = () => {
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
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='CoinDetails' component={CoinDetailsScreen} />
    </Stack.Navigator>
  );
};
export default HomeNavigation;