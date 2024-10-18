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
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: colors.gray.shade400,
        position: 'absolute',
        top: '50%',
        transform: [{translateY: -80}],
    },
    placeholder: {
        width: 40,
    },
    screenName: {
        fontSize: 18,
        color: colors.gray.shade400,
        position: 'absolute',
        bottom: -67,
        alignSelf: 'center',
    },

});

export default commonStyles;