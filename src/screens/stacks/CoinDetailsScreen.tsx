import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from "expo-image";
import numeral from 'numeral';
import { FetchAllCoins, FetchCoinDetails, FetchCoinHistory } from '@/utils/cryptoapi';
import { format } from "date-fns";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { View, Text, ActivityIndicator, Pressable } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery } from '@tanstack/react-query';
import Animated, { SharedValue } from 'react-native-reanimated';
import { Circle, useFont } from '@shopify/react-native-skia';



const CoinDetailsScreen = () => {
    // const [lineData, setLineData] = useState<any>([]);
    // const [item, setItem] = useState<any>({});
    // const [coins, setCoins] = useState([]);
    type LineData = { price: number; timestamp: number };
    const [lineData, setLineData] = useState<LineData[]>([]);
    const [item, setItem] = useState<{ [key: string]: any }>({});


    const navigation = useNavigation();

    const { params } = useRoute();
    const coinUuid = params?.coinUuid || "";

    
    // if (!font) {
    //     return <ActivityIndicator size="large" color="black" />;
    // } 
    
    const font = useFont(
        require("../../../assets/fonts/PlusJakartaSans-Bold.ttf"),
        12
    );
    const { state, isActive } = useChartPressState({ x: 0, y: { price: 0 } });
    function ToolTip({
        x,
        y,
    }: {
        x: SharedValue<number>;
        y: SharedValue<number>;
    }) {
        return <Circle cx={x.value} cy={y.value} r={8} color="red" />;
    }

    // const {data: CoinsData, isLoading: IsAllCoinsLoading} = useQuery({
    //     queryKey:["allCoins"],
    //     queryFn: FetchAllCoins,
    // })
    const { data: CoinsDetails, isLoading: CoinDetailsLoading } = useQuery({
        queryKey: ['CoinDetails', coinUuid],
        queryFn: () => coinUuid && FetchCoinDetails(coinUuid),
    });
    const { data: CoinsHistory, isLoading: CoinHistoryLoading } = useQuery({
        queryKey: ['CoinHistory', coinUuid],
        queryFn: () => coinUuid && FetchCoinHistory(coinUuid),
    });

    useEffect(() => {
        if (CoinsHistory && CoinsHistory.data.history) {
            const datasets = CoinsHistory.data.history.map((item: any) => ({
                price: parseFloat(item.price),
                timestamp: item.timestamp,
            }));
            setLineData(datasets);
        }
        if (CoinsDetails && CoinsDetails.data.coin) {
            setItem(CoinsDetails.data.coin);
        }}, [CoinsDetails, CoinsHistory]);

    return (
        <View className='flex-1 bg-white'>
            {CoinDetailsLoading || CoinHistoryLoading ? (
                <View className="absolute z-50 h-full w-full justify-center items-center">
                    <View className='h-full w-full justify-center items-center bg-black opacity-[0.45]'></View>
                    
                    <View className='absolute'>
                        <ActivityIndicator size="large" color="purple" />
                    </View>
                </View>
            ) : (
                <SafeAreaView>
                    <View className="flex-row items-center justify-between px-4">
                        <Pressable
                            className="border-2 border-neutral-500 rounded-full p-1"
                            onPress={() => navigation.goBack()}
                        >
                            <MaterialIcons
                                name="keyboard-arrow-left"
                                size={24}
                                color="gray"
                            />
                        </Pressable>
                        <View>
                            <Text className='font-bold text-lg'>{item.symbol}</Text>
                        </View>

                        <View className='border-2 border-neutral-500 rounded-full p-1'>
                            <Entypo name='dots-three-horizontal' size={24} color="gray"></Entypo>
                        </View>
                    </View>

                    <View className='px-4 justify-center items-center py-2'>
                        {/* <Text className={`font-medium text-sm text-neutral-500`}> */}
                        <Text className={`font-extrabold text-2xl`}>
                            {numeral(parseFloat(item?.price)).format("$0,0.00")}
                        </Text>
                    </View>

                    {item && (
                        <View className='flex-row justify-center items-center space-x-2 px-4 py-2'>
                            <View className='flex-row w-full py-4 items-center'>
                                <View className='w-[16%]'>
                                    <View className='w-10 h-10'>
                                        <Image
                                        source={{uri: item.iconUrl}}
                                        // placeholder={}
                                        contentFit='cover'
                                        transition={1000}
                                        className='w-full h-full flex-1'
                                        />
                                    </View>
                                </View>

                                <View className='w-[55%] justify-start items-start'>
                                    <Text className='font-bold text-lg'>{item.name}</Text>

                                    <View className='flex-row justify-center items-center space-x-2'>
                                        <Text className='font-medium text-sm text-neutral-500'>
                                            {numeral(parseFloat(item?.price)).format("$0,0.00")}
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
                            </View>
                        </View>
                    )}
                </SafeAreaView>
            )}     
        {/* <View style={{height: 400, paddingHorizontal:10}}>
            {lineData && (
                    <CartesianChart
                    chartPressState={state}
                    axisOptions={{
                        font,
                        tickCount: 8,
                        labelOffset:{x: -1, y: 0},
                        labelColor:"green",
                        formatXLabel:(ms) => format(new Date(ms * 1000), "MM/dd"),
                    }}
                    data ={lineData}
                    xKey='timestamp'
                    yKeys={['price']}
                    >
                        {({points}) => (
                            <>
                            <Line points={points.price} color="green" strokeWidth={2}
                            />
                    {isActive && state?.x?.position != null && state?.y?.price?.position != null && (
                        <ToolTip
                            x={state.x.position || 0} // Provide a fallback
                            y={state.y.price.position || 0} // Provide a fallback
                        />
                    )}
                            </>
                        )}
                    </CartesianChart>
                )}
        </View>    */}
        <View style={{ height: 400, paddingHorizontal: 10 }}>
    {lineData && Array.isArray(lineData) && lineData.length > 0 ? (
        <CartesianChart
            chartPressState={state}
            axisOptions={{
                font,
                tickCount: 8,
                labelOffset: { x: -1, y: 0 },
                labelColor: "green",
                formatXLabel: (ms) =>
                    ms ? format(new Date(ms * 1000), "MM/dd") : "Invalid",
            }}
            data={lineData}
            xKey="timestamp"
            yKeys={["price"]}
        >
            {({ points }) => (
                <>
                    {points?.price && (
                        <Line
                            points={points.price}
                            color="green"
                            strokeWidth={2}
                        />
                    )}
                    {isActive &&
                        state?.x?.position != null &&
                        state?.y?.price?.position != null && (
                            <ToolTip
                                x={state.x.position || 0}
                                y={state.y.price.position || 0}
                            />
                        )}
                </>
            )}
        </CartesianChart>
    ) : (
        <Text>No data available</Text>
    )}
</View>


        <View className='px-4 py-4'>
            {/* All Time High */}
            <View className='flex-row justify-between'>
                <Text className='text-base font-bold text-neutral-500'>
                    All Time High
                    </Text>
                <Text className={`font-bold text-base`}>
                    {numeral(parseFloat(item?.allTimeHigh?.price)).format("$0,0.00")}
                </Text>
            </View>

            {/*Number of Markets*/}
            <View className='flex-row justify-between'>
                <Text className='text-base font-bold text-neutral-500'>Number of Markets</Text>
                <Text className={`font-bold text-base`}>
                    {numeral(parseFloat(item?.numberOfMarkets)).format("$0,0.00")}
                </Text>
            </View>

            {/*Number of Exchanges*/}
            <View className='flex-row justify-between'>
                <Text className='text-base font-bold text-neutral-500'>Number of Markets</Text>
                <Text className={`font-bold text-base`}>
                    {numeral(parseFloat(item?.numberOfExchanges)).format("$0,0.00")}
                </Text>
            </View>
        </View>        
        </View>
        
    )
}

export default CoinDetailsScreen