import { View, Text } from "react-native";
import React, { useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import Animated, { FadeInRight } from "react-native-reanimated";
import {Image} from "expo-image";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";


const SplashScreen =()=>{
    const {colorScheme, toogleColorScheme} = useColorScheme();

    const {navigate}: NavigationProp<SplashNavigationType> = useNavigation();

    const blurhash = 
        "L9LW|qniy?tR$gj@S$WWuPf+QmaK" 

    useEffect(()=>{
        //setTimeout(()=>{
        //  navigate("Welcome");
        //  }, 2000);
    }, []);

    return (
            <SafeAreaView 
            className="flex=1 justify-center items-center bg-white">
                <StatusBar style="auto"/>
                
                <View className="w-full px-4 items-center">
                    <Animated.View
                        className="flex-row justify-center items-center"
                        entering={FadeInRight.duration(100).springify()}>
                            <View className="pr-2">
                                <View className="w-20 h-20 overflow-hidden">
                                    <Image
                                        source={require("../../../assets/images/logo.png")}
                                        placeholder={blurhash}
                                        contentFit="cover"
                                        transition={1000}
                                        className="w-full h-full flex-1"
                                    />
                                </View>
                            </View>
                    </Animated.View>
                    <Animated.View 
                    className="flex-row justify-center items-center"
                    entering={FadeInRight.duration(100).delay(200).springify()}>
                        <Text 
                            className="text-neutral-600 text-xl leading-[60px] pl-1"
                            style={{fontFamily:"PlusJakartaSans"}}
                            >
                            BIT
                        </Text>
                        <Text 
                            className="text-[#31aca3] text-xl leading-[60px] pl-1"
                            style={{fontFamily:"PlusJakartaSans"}}
>
                            VALUE
                        </Text>
                    </Animated.View>
                </View>
            </SafeAreaView>
    );
};

export default SplashScreen;
