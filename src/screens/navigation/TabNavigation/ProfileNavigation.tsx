import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Text } from 'react-native';
import ProfileScreen from "@/src/screens/tabs/profile/ProfileScreen";
import EditProfileScreen from '../../tabs/profile/EditProfileScreen';


const Stack = createStackNavigator();

const ProfileNavigation = () => {
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
      <Stack.Screen name='Profile' component={ProfileScreen} />
      <Stack.Screen name='EditProfile' component={EditProfileScreen} />
    </Stack.Navigator>
  );
};
export default ProfileNavigation;
