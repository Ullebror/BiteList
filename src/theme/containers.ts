import { StyleSheet } from 'react-native';
import colors from './colors';

const containers = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    TopContainer: {
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
    placeholder: {
        width: 40,
    },
})

export default containers;