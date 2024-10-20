import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import commonStyles from '../theme/commonStyles';
import { DrawerActions } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TopBarProps } from '../types/navigationTypes';
import colors from '../theme/colors';



const TopBar = ({ navigation, screenName }: TopBarProps) => {
    return (
        <View style={commonStyles.TopContainer}>
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                <MaterialCommunityIcons name="menu" size={24} color={colors.gray.shade100} />
            </TouchableOpacity>
            <View style={commonStyles.titleContainer}>
                <Text style={commonStyles.mainTitle}>BiteList</Text>
                <Text style={commonStyles.screenName}>{screenName}</Text>
            </View>
            <View style={commonStyles.placeholder} />
        </View>
    );

}

export default TopBar;