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
    inputWrapper: {
        marginBottom: 15,
        marginHorizontal: 15,
        shadowColor: colors.gray.shade500,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.4, 
        shadowRadius: 4.5, 
        elevation: 5, 
        borderRadius: 25, 
        overflow: 'hidden', 
    },
    inputs: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 25, 
        paddingHorizontal: 20,
        marginVertical: 0, 
        backgroundColor: '#fff', 
    },
    buttonWrapper: {
        width: '80%',
        marginVertical: 10, // Space between buttons
        marginHorizontal: 15, // Match the margin of your input
        shadowColor: colors.gray.shade500,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.4, 
        shadowRadius: 4.5, 
        elevation: 5,
        borderRadius: 50, // Match the button's border radius
        overflow: 'hidden', // Ensure shadow doesn't spill over edges
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