import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import * as SplashScreen from "expo-splash-screen";

export default function useCacheResources(){

    const [isLoadingComplete, setIsLoadingComplete] = useState(false)
    useEffect(() =>{ 
        async function loadResourcesAndDataAsync(){
            try{
                SplashScreen.preventAutoHideAsync();
                await Font.loadAsync({
                    PlusJakartaSansBold: require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
                    PlusJakartaSansBoldItalic: require("../assets/fonts/PlusJakartaSans-BoldItalic.ttf"),
                    PlusJakartaSansExtraBold: require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
                    PlusJakartaSansExtraBoldItalic: require("../assets/fonts/PlusJakartaSans-ExtraBoldItalic.ttf"),
                    PlusJakartaSansExtraLight: require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
                    PlusJakartaSansExtraLightItalic: require("../assets/fonts/PlusJakartaSans-ExtraLightItalic.ttf"),
                    PlusJakartaSansItalicVariableFont: require("../assets/fonts/PlusJakartaSans-Italic-VariableFont_wght.ttf"),
                    PlusJakartaSansItalic: require("../assets/fonts/PlusJakartaSans-Italic.ttf"),
                    PlusJakartaSansLight: require("../assets/fonts/PlusJakartaSans-Light.ttf"),
                    PlusJakartaSansLightItalic: require("../assets/fonts/PlusJakartaSans-LightItalic.ttf"),
                    PlusJakartaSansMedium: require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
                    PlusJakartaSansMediumItalic: require("../assets/fonts/PlusJakartaSans-MediumItalic.ttf"),
                    PlusJakartaSansRegular: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
                    PlusJakartaSansSemiBold: require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
                    PlusJakartaSansSemiBoldItalic: require("../assets/fonts/PlusJakartaSans-SemiBoldItalic.ttf"),
                    PlusJakartaSansVariableFont: require("../assets/fonts/PlusJakartaSans-VariableFont_wght.ttf"),

                ...FontAwesome.font,
                });
            }catch(e) {
                alert(e);
            } finally{
                setIsLoadingComplete(true);
                SplashScreen.hideAsync();
            }
        }
        loadResourcesAndDataAsync();
    }, []);

    return isLoadingComplete;
}