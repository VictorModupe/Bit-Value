import {
  View,
  Text,
  Pressable,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Avatar from '@/src/components/Avatar';
import useSupabaseAuth from '@/hooks/useSupaBaseAuth';
import { useUserStore } from '@/store/useUserStore';
import { useFocusEffect, useNavigation, NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { FetchAllCoins } from '@/utils/cryptoapi';
import Animated, { FadeInDown } from 'react-native-reanimated';
import numeral from 'numeral';
import { Image } from 'expo-image';

interface Coin {
  uuid: string;
  name: string;
  symbol: string;
  iconUrl: string;
  price: string;
  marketCap: string;
  change: number;
}

const HomeScreen = () => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const { getUserProfile } = useSupabaseAuth();
  const { session } = useUserStore();
  const {navigate}: NavigationProp<ScreenNavigationType> = useNavigation();

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
  
  const { data: CoinsData, isLoading: IsAllCoinsLoading } = useQuery({
    queryKey: ['allCoins'],
    queryFn: FetchAllCoins,
  });
  const renderItem = ({ item, index }: { item: Coin; index: number }) => (
    <Pressable
      className="flex-row w-full py-4 items-center"
      onPress={() => navigate('CoinDetails', { coinUuid: item.uuid })}
    >
      <Animated.View
        entering={FadeInDown.duration(100).delay(index * 200).springify()}
        className="w-full flex-row items-center"
      >
        <View className="w-[16%]">
          <View className="w-10 h-10">
            <Image
              source={{ uri: item.iconUrl }}
              contentFit='cover'
              transition={1000}
              className='w-full h-full flex-1'
            />
          </View>
        </View>
        <View className="w-[55%] justify-start items-start">
          <Text className="font-bold text-lg">{item.name}</Text>
          <View className="flex-row justify-center items-center space-x-2">
            <Text className="font-medium text-sm text-neutral-500">
              {numeral(parseFloat(item?.price)).format('$0,0.00')}
            </Text>
            <Text
              className={`font-medium text-sm ${
                item.change < 0
                  ? 'text-red-600'
                  : item.change > 0
                  ? 'text-green-600'
                  : 'text-gray-600'
              }`}
            >
              {item.change}%
            </Text>
          </View>
        </View>

        <View className="w-[29%] justify-start items-end">
          <Text className="font-bold text-base">{item.symbol}</Text>
          
          <View className='flex-row justify-center items-center space-x-2'>
            <Text className="font-medium text-sm text-neutral-500">
            {/* {numeral(parseFloat(item.marketCap)).format('0.0a').toUpperCase()} */}
            {item.marketCap.length > 9
              ? item.marketCap.slice(0,9)
            :item.marketCap}
          </Text>
        </View>
        </View>
        
      </Animated.View>
    </Pressable>
  );
  console.log({
    CoinsData,
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="relative">
        {/* Header */}

        <View className="w-full flex-row justify-between items-center px-4">
          <View className="w-3/4 flex-row space-x-2">
            <View className="justify-center items-center">
              <View className="h-12 w-12 rounded-2xl overflow-hidden">
              <Avatar url={avatarUrl} size={50} />
              </View>
            </View>
            <View>
              <Text className="text-lg font-bold">
                Hi, {username ? username : "User"} 
              </Text>
              <Text className="text-sm text-neutral-500">
                Have a Nice Day.
              </Text>
            </View>
          </View>
          <Ionicons name="menu" size={24} color="white" />
        </View>

        {/* Balance */}
        <View className='mx-4 bg-neutral-800 rounded-[34px] overflow-hidden mt-4 mb-4'>
          <View className='bg-[#5e1150] justify-center tems-center py-6 rounded-[34px]'>
            <Text className='text-sm font-medium text-neutral-700'>
              Total Balance
            </Text>

            <Text className='text-3xl font-extrabold'>$10,000.00</Text>
          </View>

          <View className='justify-between items-center flex-row py-4'>
            {/* Send to */}
            <View className='w-1/4 justify-center items-center space-y-2'>
              <View className='w-10 h-10 overflow-hidden bg-[#3B363F] rounded-full p-2'>
                <Image
                source={require("../../../../assets/images/money-send.png")}
                contentFit="cover"
                transition={1000}
                className='w-full h-full flex-1'
                />
              </View>
              <Text className='text-white'>Send to</Text>
            </View>


            {/* Request*/}
            <View className='w-1/4 justify-center items-center space-y-2'>
              <View className='w-10 h-10 overflow-hidden bg-[#3B363F] rounded-full p-2'>
                <Image
                source={require("../../../../assets/images/money-receive.png")}
                contentFit="cover"
                transition={1000}
                className='w-full h-full flex-1'
                />
              </View>
              <Text className='text-white'>Request</Text>
            </View>


            {/* Top Up */}
            <View className='w-1/4 justify-center items-center space-y-2'>
              <View className='w-10 h-10 overflow-hidden bg-[#3B363F] rounded-full p-2'>
                <Image
                source={require("../../../../assets/images/card-add.png")}
                contentFit="cover"
                transition={1000}
                className='w-full h-full flex-1'
                />
              </View>
              <Text className='text-white'>Top Up</Text>
            </View>
            {/* More Options */}
            <View className='w-1/4 justify-center items-center space-y-2'>
              <View className='w-10 h-10 overflow-hidden bg-[#3B363F] rounded-full p-2'>
                <Image
                source={require("../../../../assets/images/more.png")}
                contentFit="cover"
                transition={1000}
                className='w-full h-full flex-1'
                />
              </View>
              <Text className='text-white'>More </Text>
            </View>
            

            
          </View>
        </View>

        {/* Coins */}
        <ScrollView 
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          >
          <View className='px-4 py-8 items-center'>
            {IsAllCoinsLoading ? (
              <ActivityIndicator size="large" color="black" />
            ) : (
            <FlatList
              nestedScrollEnabled={true}
              scrollEnabled={false}
              data={CoinsData?.data?.coins || []}
              keyExtractor={(item) => item.uuid}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
