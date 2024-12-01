import { View, Text } from 'react-native';
import React from 'react';
import {
    TransitionPresets,
    createStackNavigator,
} from "@react-navigation/stack"
import SplashScreen from '../auth/SplashScreen';
import WelcomeScreen from '../auth/WelcomeScreen';
import LoginScreen from '../auth/LoginScreen';
import RegisterScreen from '../auth/RegisterScreen';
import HomeScreen from '../tabs/home/HomeScreen';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false,
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: true,
        gestureEnabled: true,
        gestureDirection: "horizontal",
    
    }}
      >
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Splash' component={SplashScreen} />
        <Stack.Screen name='Welcome' component={WelcomeScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        {/* <Stack.Screen name='HomeScreen' component={HomeScreen} /> */}

      </Stack.Navigator>
  )
}

export default AuthNavigation;