import {  View, Text } from 'react-native';
import React from 'react';
import TopBar from '../components/TopBar';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerParamList } from '../types/DrawerParamList';

type HomeScreenProps = DrawerScreenProps<DrawerParamList, 'Home'>;

export default function HomeScreen({ navigation }: HomeScreenProps) {
    return (
        <View>
            <TopBar navigation={navigation} screenName="Home" />
            <Text> Placeholder text </Text>

        </View>

    );

}