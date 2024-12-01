
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from "expo-image";
import numeral from 'numeral';
import { FetchCoinDetails, FetchCoinHistory } from '@/utils/cryptoapi';
import { format } from "date-fns";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { View, Text, ActivityIndicator, Pressable } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery } from '@tanstack/react-query';
import Animated, { SharedValue } from 'react-native-reanimated';
import { Circle, useFont } from '@shopify/react-native-skia';

const CoinDetailsScreen = () => {
    const [lineData, setLineData] = useState<any>([]);
    const [item, setItem] = useState<any>({});
    const navigation = useNavigation();

    const {
        params: { coinUuid },
    } = useRoute();

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

    const { data: CoinsDetails, isLoading: CoinDetailsLoading } = useQuery({
        queryKey: ['CoinDetails', coinUuid],
        queryFn: () => coinUuid && FetchCoinDetails(coinUuid),
    });
    const { data: CoinsHistory, isLoading: CoinHistoryLoading } = useQuery({
        queryKey: ['CoinHistory', coinUuid],
        queryFn: () => coinUuid && FetchCoinHistory(coinUuid),
    });

    useEffect(() => {
        if (CoinsHistory?.data?.history) {
            const datasets = CoinsHistory.data.history.map((item: any) => ({
                price: parseFloat(item.price),
                timestamp: item.timestamp,
            }));
            setLineData(datasets);
        }

        if (CoinsDetails?.data?.coin) {
            setItem(CoinsDetails.data.coin);
        }
    }, [CoinsDetails, CoinsHistory]);

    return (
        <View className="flex-1 bg-white">
            {(CoinDetailsLoading || CoinHistoryLoading) && (
                <View className="absolute z-50 h-full w-full bg-black opacity-50 justify-center items-center">
                    <ActivityIndicator size="large" color="white" />
                </View>
            )}
            {!CoinDetailsLoading && !CoinHistoryLoading && (
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

                        <Text className="font-bold text-lg">{item.symbol || "N/A"}</Text>

                        <View className="border-2 border-neutral-500 rounded-full p-1">
                            <Entypo name="dots-three-horizontal" size={24} color="gray" />
                        </View>
                    </View>

                    <View className="px-4 py-2">
                        <Text className="font-extrabold text-2xl">
                            {numeral(parseFloat(item?.price || 0)).format("$0,0.00")}
                        </Text>
                    </View>

                    <View className="px-4">
                        <CartesianChart
                            chartPressState={state}
                            axisOptions={{
                                font,
                                tickCount: 8,
                                labelOffset: { x: -1, y: 0 },
                                labelColor: "green",
                                formatXLabel: (ms) =>
                                    format(new Date(ms * 1000), "MM/dd"),
                            }}
                            data={lineData}
                            key="timestamp"
                            yKey={["price"]}
                        >
                            {({ points }) => (
                                <>
                                    <Line
                                        points={points.price}
                                        color="green"
                                        strokeWidth={2}
                                    />
                                    {isActive && (
                                        <ToolTip
                                            x={state.x.position}
                                            y={state.y.price.position}
                                        />
                                    )}
                                </>
                            )}
                        </CartesianChart>
                    </View>
                </SafeAreaView>
            )}
        </View>
    );
};

export default CoinDetailsScreen;
