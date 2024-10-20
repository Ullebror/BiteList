import { View } from 'react-native';
import React from 'react';
import TopBar from '../components/TopBar';
import { ShoppingListScreenProps } from '../types/navigationTypes';

export default function ShoppingListScreen({ navigation }: ShoppingListScreenProps) {
        
    return (
        <View>
            <TopBar navigation={navigation} screenName='Shopping List'/>

        </View>

    );
}