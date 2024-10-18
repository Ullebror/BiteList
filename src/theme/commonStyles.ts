import { StyleSheet } from 'react-native';
import texts from './texts';
import buttons from './buttons';
import containers from './containers';




const commonStyles = StyleSheet.create({
    ...texts,
    ...buttons,
    ...containers,
});

export default commonStyles;