import {  View } from 'react-native';
import React from 'react';
import TopBar from '../components/TopBar';
import RequireAuth from '../components/RequireAuth';
import { ProfileScreenProps } from '../types/navigationTypes';


export default function ProfileScreen({ navigation }: ProfileScreenProps) {
        
    return (
        <RequireAuth>
            <View>
                <TopBar navigation={navigation} screenName="Profile" />

            </View>
        </RequireAuth>

    );
}