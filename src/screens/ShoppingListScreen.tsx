import { View } from 'react-native';
import React from 'react';
import TopBar from '../components/TopBar';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerParamList } from '../types/DrawerParamList';

type ShoppingListScreenProps = DrawerScreenProps<DrawerParamList, "ShoppingList">

export default function ShoppingListScreen({ navigation }: ShoppingListScreenProps) {
        
    return (
        <View>
            <TopBar navigation={navigation} screenName='Shopping List'/>

        </View>

    );
}