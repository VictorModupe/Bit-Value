import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import styled from "styled-components/native";
import { StatusBar } from 'expo-status-bar';
import RootNavigation from './src/screens/navigation/RootNavigation';
import useCacheResources from './hooks/useCacheResources';
import {useUserStore} from "./store/useUserStore";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './global.css';


const App = () => {
  const {session, user} = useUserStore();
  const queryClient = new QueryClient();
  const isLoadingComplete = useCacheResources();
  
  useEffect(()=> console.log(user, session), [user, session]);
  
  if (!isLoadingComplete){
    return null;
  } 
  
  return (
    <Container>
      <StatusBar style='auto'/>
      <QueryClientProvider client={queryClient}>
      <RootNavigation />
      </QueryClientProvider>
    </Container>
  );
};

export default App;

const Container = styled(View)`
  flex: 1;
`;
