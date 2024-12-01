import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import Animated, { FadeInRight } from "react-native-reanimated";
import { Image } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const SplashScreen = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme(); // Correct spelling of toggleColorScheme
  const navigation = useNavigation<NavigationProp<SplashNavigationType>>();

//   const blurhash = "LEG+gyaK2cb@cun%nOR*?Vg2D,rs"; // Ensure valid blurhash or remove if not needed

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Welcome"); // Use the navigation object
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <StatusBar style="auto" />

      <View className="w-full px-4 items-center">
        <Animated.View
          className="flex-row justify-center items-center"
          entering={FadeInRight.duration(100).springify()}
        >
          <View className="pr-2">
            <View className="w-20 h-20 overflow-hidden">
              <Image
                source={require("../../../assets/images/logo.png")}
                // placeholder={blurhash} // Optional if expo-image is used
                contentFit="contain"
                transition={1000}
                className="w-full h-full flex-1"
              />
            </View>
          </View>
        </Animated.View>

        <Animated.View
          className="flex-row justify-center items-center"
          entering={FadeInRight.duration(100).delay(200).springify()}
        >
          <Text
            className="text-neutral-600 text-xl leading-[60px] pl-1"
            style={{ fontFamily: "PlusJakartaSansRegular" }}
          >
            BIT
          </Text>
          <Text
            className="text-[#800080] text-xl leading-[60px] pl-1"
            style={{ fontFamily: "PlusJakartaSansSemiBoldItalic" }}
          >
            VALUE
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
