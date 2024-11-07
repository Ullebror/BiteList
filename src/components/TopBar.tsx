import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from '../theme/styles';
import { DrawerActions } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TopBarProps } from '../types/navigationTypes';
import colors from '../theme/colors';



const TopBar = ({ navigation, screenName }: TopBarProps) => {
    return (
        <View style={styles.TopContainer}>
            <TouchableOpacity 
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            >
                <MaterialCommunityIcons 
                    name="menu" 
                    size={24} 
                    color={colors.gray.shade100} 
                />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Text style={styles.mainTitle}>BiteList</Text>
                <Text style={styles.screenName}>{screenName}</Text>
            </View>
            <View style={styles.placeholder} />
        </View>
    );

}

export default TopBar;