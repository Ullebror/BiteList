import { StyleSheet } from 'react-native';
import colors from './colors';

const containers = StyleSheet.create({
    container: {
        flex: 1,

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
    inputs: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 20,
        marginVertical: 10,
      },
    placeholder: {
        width: 40,
    },
    socialButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,

    },
})

export default containers;