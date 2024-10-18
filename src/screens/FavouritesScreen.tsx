import {  View } from 'react-native';
import React from 'react';
import TopBar from '../components/TopBar';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerParamList } from '../types/DrawerParamList';

type FavouritesScreenProps = DrawerScreenProps<DrawerParamList, 'Favourites'>;

export default function FavouritesScreen({ navigation }: FavouritesScreenProps) {
        
    return (
        <View>
            <TopBar navigation={navigation} screenName="Favourites" />

        </View>

    );
}