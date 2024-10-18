import { StyleSheet } from 'react-native';
import colors from './colors';

const texts = StyleSheet.create({
    
    titleText: {

    },
    subText: {

    },
    contentText: {

    },

    mainTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        color: colors.gray.shade400,
        position: 'absolute',
        top: '50%',
        transform: [{translateY: -80}],
    },

    screenName: {
        fontSize: 18,
        color: colors.gray.shade400,
        position: 'absolute',
        bottom: -67,
        alignSelf: 'center',
    },
})

export default texts;