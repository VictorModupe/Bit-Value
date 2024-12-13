import React, {useState} from 'react';
import {
    TransitionPresets, 
    createStackNavigator
} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import TabNavigation from './TabNavigation';
import { useUserStore } from '@/store/useUserStore';

const Stack = createStackNavigator(); 

const RootNavigation = () => {
    const [session, setSession] = useState(true)
    // console.log('Session:', session);
  return (
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
                animationEnabled: true,
                gestureEnabled: true,
                gestureDirection: "horizontal",
            }}
        >
            {session && session.user ? (
                    <Stack.Screen 
                    name='TabNavigation' 
                    component={TabNavigation} />
                ) : (
                    <Stack.Screen 
                    name='TabNavigation' 
                    component={TabNavigation} />
                )
            }
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

