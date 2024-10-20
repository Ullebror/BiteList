import {  View } from 'react-native';
import React from 'react';
import TopBar from '../components/TopBar';
import { ProfileScreenProps } from '../types/navigationTypes';


export default function ProfileScreen({ navigation }: ProfileScreenProps) {
        
    return (
        <View>
            <TopBar navigation={navigation} screenName="Profile" />

        </View>

    );
}