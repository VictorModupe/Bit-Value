import {
  View,
  Text,
  Pressable,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
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

const MarketScreen= () => {
  const {navigate}: NavigationProp<ScreenNavigationType> = useNavigation();
  const [topGainers, setTopGainers] = useState([]);
  const [topLoser, setTopLoser] = useState([]);
  const [active, setActive] = useState("all");

  const allCoins =()=> {
    setActive("all");
  };



  const calculateTopGainers = () => {
    // if (!CoinsData || !CoinsData.data) return;
    setActive("gainers");
    const gainers = CoinsData.data.coins.filter(
      (coin) => parseFloat(coin.change) > 0
    );
    setTopGainers(gainers);
  };

  const calculateTopLosers = () => {
    setActive("losers");
    const losers = CoinsData.data.coins.filter(
      (coin) => parseFloat(coin.change) < 0
    );
    setTopLoser(losers);
  };




  const { data: CoinsData, isLoading: IsAllCoinsLoading } = useQuery({
    queryKey: ["allCoins"],
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
        <View className='w-full flex-row items-center px-4 pb-4'>
          <View className='w-3/4 flex-row space-x-2'>

            <View>
              <Text className='text-3xl font-bold'>Market</Text>
            </View>
            </View>
          </View>

        </View>
        <View className='px-4 flex-row justify-between items-center pb-4'>
          {/* All */}
          <Pressable 
          className={`w-1/4 justify-center items-center py-1 ${
            active === "all" ? "border-b-4 border-[#5170ff]" : ""
          }`}
          onPress={allCoins}
          ><Text className={`text-lg ${active === "all" ? "font-extrabold" : ""}`}>
              All
              </Text>  

          </Pressable>
          {/* Gainers */}
          <Pressable 
          className={`w-1/4 justify-center items-center py-1 ${
            active === "gainers" ? "border-b-4 border-[#5170ff]" : ""
          }`}
          onPress={calculateTopGainers}
          ><Text className={`text-lg ${active === "all" ? "font-extrabold" : ""}`}>
              Gainers
              </Text>  

          </Pressable>
          {/* Losers */}
          <Pressable 
          className={`w-1/4 justify-center items-center py-1 ${
            active === "losers" ? "border-b-4 border-[#5170ff]" : ""
          }`}
          onPress={calculateTopLosers}
          ><Text className={`text-lg ${active === "all" ? "font-extrabold" : ""}`}>
              Losers
              </Text>  

          </Pressable>
        </View>
        {/* Coins */}
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          >
          <View className='px-4 py-8 items-center'>
              {/* All */}
            {active === "all" && (
                <View className='px-4 items-center'>
                   {IsAllCoinsLoading ? (
                      <ActivityIndicator size="large" color="black" />
                    ) : (
                    <FlatList
                      nestedScrollEnabled={true}
                      scrollEnabled={false}
                      data={CoinsData?.data?.coins}
                      keyExtractor={(item) => item.uuid}
                      renderItem={renderItem}
                      showsVerticalScrollIndicator={false}
                        />
                      )}
                </View>
              )}
              {/* Gainers */}
            {active === "gainers" && (
                <View className='px-4 items-center'>
                   {IsAllCoinsLoading ? (
                      <ActivityIndicator size="large" color="black" />
                    ) : (
                    <FlatList
                      nestedScrollEnabled={true}
                      scrollEnabled={false}
                      data={active === "gainers" ? topGainers : CoinsData.data.coins}
                      keyExtractor={(item) => item.uuid}
                      renderItem={renderItem}
                      showsVerticalScrollIndicator={false}
                        />
                      )}
                </View>
              )}
              {/* Losers */}
            {active === "losers" && (
                <View className='px-4 items-center'>
                   {IsAllCoinsLoading ? (
                      <ActivityIndicator size="large" color="black" />
                    ) : (
                    <FlatList
                      nestedScrollEnabled={true}
                      scrollEnabled={false}
                      data={active === "losers" ? topLoser : CoinsData.data.coins}
                      keyExtractor={(item) => item.uuid}
                      renderItem={renderItem}
                      showsVerticalScrollIndicator={false}
                        />
                      )}
                </View>
              )}
           
          </View>
        </ScrollView>
    </SafeAreaView>
  );
};

export default MarketScreen;
