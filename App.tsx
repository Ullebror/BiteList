import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import React from 'react';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <View>
      <HomeScreen />
      <Text>something</Text>

      <StatusBar style="auto" />
    </View>
  );
}
