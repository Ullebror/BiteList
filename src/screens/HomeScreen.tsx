import {  View, Text } from 'react-native';
import React from 'react';
import TopBar from '../components/TopBar';

export default function HomeScreen({ navigation }) {
    return (
        <View>
            <TopBar navigation={navigation} />
            <Text> Placeholder text </Text>

        </View>

    );

}