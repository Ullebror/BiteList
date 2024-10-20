import {  View } from 'react-native';
import React from 'react';
import RequireAuth from '../components/RequireAuth';
import TopBar from '../components/TopBar';
import { FavouritesScreenProps } from '../types/navigationTypes';


export default function FavouritesScreen({ navigation }: FavouritesScreenProps) {
        
    return (
        <RequireAuth>
            <View>
                <TopBar navigation={navigation} screenName="Favourites" />

            </View>
        </RequireAuth>

    );
}