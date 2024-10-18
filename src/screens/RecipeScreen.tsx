import { View } from 'react-native';
import React from 'react';
import TopBar from '../components/TopBar';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerParamList } from '../types/DrawerParamList';

type RecipeScreenProps = DrawerScreenProps<DrawerParamList, "Recipe">

export default function RecipeScreen({ navigation }: RecipeScreenProps) {

    return (
        <View>
            <TopBar navigation={navigation} screenName='Recipe'/>

        </View>

    );
}