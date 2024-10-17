import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import commonStyles from '../theme/commonStyles';
import { DrawerActions } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../theme/colors';

const TopBar = ({ navigation }: any) => {
    return (
        <View style={commonStyles.container}>
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                <MaterialCommunityIcons name="menu" size={24} color={colors.gray.shade100} />
            </TouchableOpacity>
            <Text style={commonStyles.title}>BiteList</Text>
            <View style={commonStyles.placeholder} />
        </View>
    );

}

export default TopBar;