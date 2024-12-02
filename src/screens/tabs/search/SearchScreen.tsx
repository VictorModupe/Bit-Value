import { useNavigation, NavigationProp } from "@react-navigation/native";
import {SearchCoins} from "@/utils/cryptoapi";
import {debounce} from "lodash";
import React, { useCallback, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import {XMarkIcon} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useUserStore } from "@/store/useUserStore";
import useSupabaseAuth from "@/hooks/useSupaBaseAuth";
import { Image } from "expo-image";
import numeral from "numeral";

interface Coin {
    uuid: string;
    name: string;
    symbol: string;
    iconUrl: string;
    price: string;
    change: string;
    marketCap:string;
}

const blurhash =
    ""

const SearchScreen =()=>{
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<any>([]);
    // const {session} = useUserStore();
    // const {getUserProfile} = useSupabaseAuth();
  console.log({results});
    const {navigate}: NavigationProp<ScreenNavigationType> = useNavigation();

    const {navigate: navigateHome}: NavigationProp<HomeNavigationType> = 
        useNavigation();

        const renderItem = ({ item, index }: { item: Coin; index: number }) => (
          <Pressable
            className="flex-row w-full py-4 items-center px-4"
            onPress={() => navigate('CoinDetails', { coinUuid: item.uuid })}
            key={item.uuid}
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
                  <Text className={"font-medium text-sm text-neutral-500"}>
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
                  {numeral(parseFloat(item.marketCap)).format('0.0a').toUpperCase()}
                  {item?.marketCap?.length > 9
                    ? item.marketCap.slice(0,9)
                  :item.marketCap}
                </Text>
              </View>
              </View>
              
            </Animated.View>
          </Pressable>
        );
    
    const handleSearch = async (search:string) => {
      console.log({search});
      if (search && search.length > 2) {
        setLoading(true);

        try{
          const results = await SearchCoins(search);

          if(results) {
            setResults(results)
          }
        } catch (error){
          console.log(error)
          setResults([])
            setLoading(false);
        } finally {
          setLoading(false)
        }
      }
    };
    const handleTextDebounce = useCallback(debounce(handleSearch, 400 ), [])
        
  return (
    <SafeAreaView className="bg-white flex-1">
      {/* Header */}
      <View className='w-full flex-row items-center px-4 pb-4'>
        <View className='w-3/4 flex-row space-x-2'>

          <View>
            <Text className='text-3xl font-bold'>Search</Text>
          </View>
          </View>
      </View>

      {/* Search Field */}
      <View className="mx-4 mb-3 flex-row p-2 border-2 justify-between items-center bg-white rounded-sm">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search for Coins"
          placeholderTextColor="gray"
          className="pl-12 flex-1 font-medium text-black tracking-wider"
         />
         <Pressable onPress={()=> navigateHome("Home")}>
            <XMarkIcon size="25" color="black"/>
         </Pressable>
      </View>


      <View className="mt-4">
        {loading ? (
            <View>
              <ActivityIndicator size="large" color="#164bd8" />
            </View>
          ) : (
            <FlatList
              data={results?.data?.coins}
              keyExtractor={(item)=> item.uuid}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          )}
      </View>
    </SafeAreaView>
  )
  }
export default SearchScreen;