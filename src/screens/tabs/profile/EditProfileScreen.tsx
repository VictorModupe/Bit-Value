import useSupabaseAuth from '@/hooks/useSupaBaseAuth';
import Avatar from '@/src/components/Avatar';
import Button from '@/src/components/Button';
import ButtonOutline from '@/src/components/ButtonOutline';
import { useUserStore } from '@/store/useUserStore';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Input} from "react-native-elements";
import { BookmarkSquareIcon, ChevronLeftIcon, ShareIcon } from 'react-native-heroicons/outline';

const EditProfileScreen = () => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const { getUserProfile, updateUserProfile } = useSupabaseAuth();
  const { session } = useUserStore();
  const navigation = useNavigation();


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
        setFullName(data.full_name);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  
  async function handleUpdateProfile(){
    setLoading(true);
    try {
        const {error } = await updateUserProfile(
            username, 
            fullName, 
            avatarUrl
        );
        if (error) {
          setLoading(false)
          Alert.alert(`Your Profile Update Failed ${error}`)
        } else {
            Alert.alert(`Your Profile Update is Sucessful`)
        }
    }  catch (error) {
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

//   async function handleSignOut(){
//     await signOut()
//   }
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View>
        <View className='flex-row items-center justify-between px-4'>
            <View className='w-1/3'>
                <Pressable onPress={()=> navigation.goBack()}>
                    <View className='border-2 border-neutral-500 h-10 w-10 p-2 rounded-full items-center justify-center'>
                    <ChevronLeftIcon size={25} strokeWidth={3} color="gray" />
                    </View>
                </Pressable>
            </View>
            <View className='w-1/3'>
                <Text>Edit Profile</Text>
            </View>
        </View>
        {/* Avatar */}
        <View>
        <View className='justify-center items-center py-2'>
          <View className='overflow-hidden border-2 border-[#7c04e0] rounded-full'>
            <Avatar size={100} url={avatarUrl} showUpload={true} 
            onUpload={(url:string)=>{setAvatarUrl(url)}}/>
          </View>
          <View className='w-full py-3 items-center'>
            <Text className='text-lg font-bold text-white'>{username}</Text>
          </View>
        </View>
        </View>

        <View className='px-4'>
            <View>
                <Input 
                    label='Email' 
                    value={session?.user?.email} disabled/>
            </View>
            <View className='space-x-1'>
                <Input 
                    label='Username' 
                    value={username || ""}
                    onChangeText={(text)=> setUsername(text)}
                    />
            </View>
            <View className='space-x-1'>
                <Input 
                    label='Fullname' 
                    value={fullName || ""}
                    onChangeText={(text)=> setFullName(text)}
                    />
            </View>
            <Button 
                title={loading ? <ActivityIndicator color="white" /> : "Update"}
                action={()=> handleUpdateProfile()}
            />
        </View>
    </View>
    </SafeAreaView>
  );
}

export default EditProfileScreen;
