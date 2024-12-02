import {FetchCryptoNews } from '@/utils/cryptoapi';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { View, Text, Pressable, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import { BookmarkSquareIcon } from 'react-native-heroicons/outline';


const NewsScreen = () => {
  const { data: NewsData, isLoading: IsNewsLoading } = useQuery({
    queryKey: ['cryptonews'],
    queryFn: FetchCryptoNews,
  });

const navigation = useNavigation();

const handleClick = (item) => {
    navigation.navigate( "NewsDetails", item);
};

const renderItem = ({item, index}) => {
  return(
    <Pressable 
      className='mb-4 mx-4 space-y-1'
      key={index}
      onPress={()=> handleClick(item)}
      >
        <View className='flex-row justify-start w-[100%] shadow-sm'>
          {/* Image */}
          <View className='items-start justify-start w-[20%]'>
            <Image 
            source={{
              uri: item.thumbnail
            }}
            style={{
              width: hp(9), height: hp(10),
            }}
            resizeMode='cover'
            className='rounded-lg'
            />
          </View>

            {/* Content */}
          <View className='w-[70%] pl-4 justify-center space-y-1'>
            {/* Description */}
              <Text className='text-xs font-bold text-gray-900'>
                {item?.description?.length > 20
                ? item.description.slice(0,20) + "..."
                : item.description}
              </Text>

                {/* Title */}
              <Text className='text-neutral-800 capitalize max-w-[90%]'>
                {item?.title?.length > 20
                  ? item.title.slice(0, 50) + "..."
                  : item.title}
              </Text>
                  <Text className='text-xs text-gray-700'>{item.createdAt}</Text>
            </View>
            {/* BookMark */}
              <View className='w-[10%] justify-center'>
                <BookmarkSquareIcon color="gray" />
              </View>
          </View>
      </Pressable>
    );
  }
;



  return (
    <SafeAreaView className='space-y-2 bg-white dark:bg-neutral-500 flex-1'>
      {/* Header */}
      <View className='w-full flex-row justify-between items-center px-4 pb-4'>
        <View className='w-3/4 flex-row space-x-2'>
          <Text className='text-3xl font-bold'>Crypto News</Text>
        </View>
      </View>

      {/* Main News */}
      <View>
        {
          NewsData && NewsData.data.length > 0 ? (
            <FlatList
              data={NewsData.data}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index)=> index.toString()}
              renderItem={renderItem}
            />
          ) : (
            <View>
              <ActivityIndicator size="large" color="black"/>
            </View>
          )
        }
      </View>
      </SafeAreaView>
  );
}

export default NewsScreen;
