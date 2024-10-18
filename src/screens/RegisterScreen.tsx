import { View } from 'react-native';
import React from 'react';
import TopBar from '../components/TopBar';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerParamList } from '../types/DrawerParamList';

type RegisterScreenProps = DrawerScreenProps<DrawerParamList, 'Register'>

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
        
    return (
        <View>
            <TopBar navigation={navigation} screenName='Register'/>

        </View>

    );
}