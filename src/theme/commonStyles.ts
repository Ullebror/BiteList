import { StyleSheet } from 'react-native';
import colors from './colors';

const commonStyles = StyleSheet.create({
    container: {
        height: 135,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: colors.green.shade100,
        borderBottomWidth: 1,

    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: colors.gray.shade400,
    },
    placeholder: {
        width: 40,
    },

});

export default commonStyles;