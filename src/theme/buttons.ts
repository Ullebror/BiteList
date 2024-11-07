import { StyleSheet } from 'react-native';
import colors from './colors';

const buttons = StyleSheet.create({
    orangeButton: {
        backgroundColor: colors.orange.shade100,
        borderRadius: 50,
        padding: 20,
        alignItems: 'center',
        width: '99%',
    },
    searchButton: {
        backgroundColor: colors.orange.shade100,
        borderRadius: 50,
        padding: 20,
        alignItems: 'center',
    },
    socialButton: {
        borderRadius: 20,
        alignItems: 'center',
        width: '40%',
        justifyContent: 'center',
        paddingVertical: 10,
        flexDirection: 'row',

    },
    facebook: {
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '30%',
        paddingVertical: 10,
        flexDirection: 'row',
    },
    link: {
        color: colors.blue.shade200,
        marginRight: 20,
        marginBottom: 5,

    },
})

export default buttons;