import { Text, View } from 'react-native';
import React from 'react';
import TopBar from '../components/TopBar';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerParamList } from '../types/DrawerParamList';

type LoginScreenProps = DrawerScreenProps<DrawerParamList, "Login">;

export default function LoginScreen({ navigation }: LoginScreenProps) {
    
    return (
        <View>
            <TopBar navigation={navigation} screenName="Login" />
            <Text> Placeholder text </Text>
            
        </View>
    );
}