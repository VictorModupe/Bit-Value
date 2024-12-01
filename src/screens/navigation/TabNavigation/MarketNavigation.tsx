import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Text } from 'react-native';

import MarketScreen from '../../tabs/market/MarketScreen';

const Stack = createStackNavigator();

const MarketNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false,
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: true,
        gestureEnabled:true,
        gestureDirection:"horizontal",
      }}>
      <Stack.Screen name='Market' component={MarketScreen} />
    </Stack.Navigator>
  );
};
export default MarketNavigation;