 
 import React, {useState} from 'react';
import {
    View, 
    Text, 
    ActivityIndicator, 
    Dimensions, 
    TextInput,
    Pressable,
    Alert } from 'react-native';
import Animated, { FadeInDown} from 'react-native-reanimated';
import Button  from '@/src/components/Button';
import Breaker from '@/src/components/Breaker';
import ButtonOutline from '@/src/components/ButtonOutline';
import {AntDesign} from '@expo/vector-icons';
import {NavigationProp, useNavigation}from "@react-navigation/native";
import {supabase} from "@/lib/supabase";
import {useUserStore} from "@/store/useUserStore";


const {width, height} = Dimensions.get("window");

const LoginScreen =()=> {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {setUser, setSession} = useUserStore();

    const {navigate: navigateAuth }: NavigationProp<AuthNavigationType> =
        useNavigation();

    async function signInWithEmail() {
        if (!email || !password) {
            Alert.alert("Error", "Please fill out all fields.");
            return;
          }
        setIsLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
              email,
              password,
            });
            if (error) {
              setIsLoading(false);
              Alert.alert("Authentication Error", error.message);
            } else if (data.session && data.user) {
              setSession(data.session);
              setUser(data.user);
            }
          } catch (e) {
            console.error(e);
            Alert.alert("Error", "An unexpected error occurred.");
          } finally {
            setIsLoading(false);
          }

    }

    return (
        <View className="flex-1">
        {isLoading && (
            <View className="absolute z-50 h-full w-full justify-center items-center">
                <View className="h-full w-full justify-center items-center bg-black opacity-[0.45]"></View>

            <View className='absolute'>
                <ActivityIndicator size="large" color="white" />
            </View>
            </View>
        )}
        <View className='justify-center items-center relative flex-1'>
            <View
                className='justify-center w-full px-4 space-y-4'
                style={{height:height * 0.75,
                }}
        >
            {/* Welcome Text */}
            <Animated.View
                className="justify-center items-center"
                entering={FadeInDown.duration(100).springify()}
                >
                
                <Text
                    className='text-neutral-800 text-2xl leading-[60px]'
                    style={{
                        fontFamily:"PlusJakartaSansBold",
                    }}
                    >
                        Welcome Back
                    </Text>
                    <Text className='text-neutral-500 text-sm font-medium'>
                        Welcome Back! Please enter your details.
                    </Text>
            </Animated.View>


                    {/* Email and Password Text Input */}
                    <Animated.View
                        className="py-8 space-y-8"
                        entering={FadeInDown.duration(100).delay(200).springify()}
                        >
                            {/* User Email */}
                            <View className='border-2 border-gray-400 rounded-lg mb-2'>
                                <TextInput
                                className='p-4'
                                onChangeText={(text) => setEmail(text)}
                                value={email}
                                placeholder='Email'
                                autoCapitalize='none'
                            />
                            </View>

                        {/* User Password */}
                        <View className='border-2 border-gray-400 rounded-lg mb-2'>
                            <TextInput 
                                className='p-4'
                                onChangeText={(text)=> setPassword(text)}
                                value={password}
                                placeholder='Password'
                                autoCapitalize='none'
                                secureTextEntry={true}
                            />
                        </View>
                    </Animated.View>
                    {/* Login Button */}
                    <Animated.View
                        className="w-full justify-start"
                        entering={FadeInDown.duration(100).delay(300).springify()}
                    >
                        <View className='pb-6'>
                            <Button title={"Login"} action={() => signInWithEmail()} />
                        </View>    
                    </Animated.View>

                    {/* Breaker Line */}
                    <View>
                        <Breaker />    
                    </View>

            {/* 3rd Party Auth */}
            <View className='w-full justify-normal'>
                <Animated.View
                    entering={FadeInDown.duration(100).delay(600).springify()}
                    className="border-white pb-4"
                >
                <ButtonOutline title=" Continue with Google">
                <AntDesign name='google' size={20} color="gray" />
                </ButtonOutline>

                <ButtonOutline title=" Continue with Apple">
                <AntDesign name='apple1' size={20} color="gray" />
                </ButtonOutline>
             </Animated.View>
          </View>


        {/* Dont have an Account */}
        <Animated.View
            className="flex-row justify-center items-center"
            entering={FadeInDown.duration(100).delay(700).springify()}
        >
            <Text
                className='text-neutral-500 text-lg font-medium leading-[38px] text-center'
                style={{
                    fontFamily:"PlusJakartaSansMedium",
                }} 
            >
                Dont have an Account with Us? {" "}
                </Text>    
                <Pressable onPress={() => navigateAuth("Register")}>
                    <Text className='text-neutral-800 text-lg font-medium leading-[38px] text-center'
                        style={{
                            fontFamily:"PlusJakartaSansBold"
                        }}
                    >
                        Register{""}
                        </Text>
                </Pressable>
        </Animated.View>
      </View>
     </View>
    </View>
 );
};

export default LoginScreen;