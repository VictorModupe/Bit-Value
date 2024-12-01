import { View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Avatar from "@/src/components/Avatar";





const ProfileScreen =()=> {
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    useFocusEffect(
        
    



    );
    return (
        <View className="flex-1 bg-white">
            <View>
                {/* Avatar */}
                <View className="justify-center items-center py-14 pb-20 bg-[#2ab07c]">
                    <View className="overflow-hidden border-2 border-white rounded-3xl">
                        <Avatar size={100} url={avatarUrl} />
                    </View>

                    <View className="w-full py-3 items-center">
                        <Text className="text-lg font-bold text-white">{username}</Text>
                    </View>
                </View>
            </View>
            <Text> ProfileScreen</Text>
        </View>
    )
}

export default ProfileScreen;