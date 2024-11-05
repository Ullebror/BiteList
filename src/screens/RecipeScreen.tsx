import { View } from 'react-native';
import React from 'react';
import TopBar from '../components/TopBar';
import { RecipeScreenProps } from '../types/navigationTypes';

export default function RecipeScreen({ navigation }: RecipeScreenProps, recipe : any) {

    return (
        <View>
            <TopBar navigation={navigation} screenName='Recipe'/>

        </View>

    );
}