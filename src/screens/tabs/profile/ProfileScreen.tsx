import useSupabaseAuth from '@/hooks/useSupaBaseAuth';
import Avatar from '@/src/components/Avatar';
import { useUserStore } from '@/store/useUserStore';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import EditProfileScreen from './EditProfileScreen';

const ProfileScreen = () => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const { getUserProfile ,signOut } = useSupabaseAuth();
  const { session } = useUserStore();
  const navigation = useNavigation();

  interface Coin {
    uuid: string;
    name: string;
    symbol: string;
    iconUrl: string;
    price: string;
    marketCap: string;
    change: number;
  }  

  async function handleGetProfile() {
    setLoading(true);

    try {
      const { data, error, status } = await getUserProfile();
      if (error && status !== 406) {
        setLoading(false)
        throw error;
      }
      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (session) {
        handleGetProfile();
      }
    }, [session])
  );

  async function handleSignOut(){
    await signOut()
  }
  return (
    <View className='flex-1 bg-white'>
      <View>
         {/* Avatar */}
        <View className='justify-center items-center py-14 pb-20 bg-[#7c04e0]'>
          <View className='overflow-hidden border-2 border-white rounded-full'>
            <Avatar size={100} url={avatarUrl} onUpload={function (filePath: string): void {
              throw new Error('Function not implemented.');}}/>
          </View>
          <View className='w-full py-3 items-center'>
            <Text className='text-lg font-bold text-white'>{username}</Text>
          </View>
        </View>

        <View
          className='bg-white px-4 py-6 -mt-11'
          style={{
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}>
            <Text className='text-lg font-bold'>Account OverView</Text>
        </View>

        {/* Edit My Profile */}
        <View className='p-2 py-3 bg-gray-100 rounded-xl border-2 border-gray-300 my-3 mx-2'>
          <Pressable className='flex-row justify-between items-center'
            onPress={() => navigation.navigate("EditProfileScreen")}>
              <View className='flex-row justify-center items-center space-x-2'>
                <View className='bg-[#7c04e0] p-1 rounded-lg'>
                  <MaterialIcons name="person-2" size={24} color="white" />
                </View>
                <Text className='text-lg text-gray-600 font-semibold p-3'>
                  Edit My Profile
                </Text>
              </View>
              <MaterialIcons name='arrow-forward-ios' size={20} color="black"/>
          </Pressable>
        </View>

        {/* Change Password*/}
        <View className='p-2 py-3 bg-gray-100 rounded-xl border-2 border-gray-300 my-3 mx-2'>
          <Pressable className='flex-row justify-between items-center'
            onPress={() => handleSignOut()}>
              <View className='flex-row justify-center items-center space-x-2'>
                <View className='bg-[#7c04e0] p-1 rounded-lg'>
                  <MaterialIcons name="password" size={24} color="white" />
                </View>
                <Text className='text-lg text-gray-600 font-semibold p-3'>
                  Change Password
                </Text>
              </View>
              <MaterialIcons name='arrow-forward-ios' size={20} color="black"/>
          </Pressable>
        </View>

        {/*Log-Out */}
        <View className='p-2 py-3 bg-gray-100 rounded-xl border-2 border-gray-300 my-3 mx-2'>
          <Pressable className='flex-row justify-between items-center'
            onPress={() => handleSignOut()}>
              <View className='flex-row justify-center items-center space-x-2'>
                <View className='bg-[#7c04e0] p-1 rounded-lg'>
                  <MaterialIcons name="logout" size={24} color="white" />
                </View>
                <Text className='text-lg text-gray-600 font-semibold p-3'>
                  Log Out of Account
                </Text>
              </View>
              <MaterialIcons name='arrow-forward-ios' size={20} color="black"/>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default ProfileScreen;