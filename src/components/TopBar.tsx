import { View, Text } from 'react-native';
import React from 'react';
import commonStyles from '../theme/commonStyles';

const TopBar = () => {
    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.title}>BiteList</Text>
        </View>
    );

}

export default TopBar;