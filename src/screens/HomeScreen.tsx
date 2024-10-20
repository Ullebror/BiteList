import {  View, Text } from 'react-native';
import React from 'react';
import TopBar from '../components/TopBar';
import { HomeScreenProps } from '../types/navigationTypes';

export default function HomeScreen({ navigation }: HomeScreenProps) {
    return (
        <View>
            <TopBar navigation={navigation} screenName="Home" />
            <Text> Placeholder text </Text>

        </View>

    );

}