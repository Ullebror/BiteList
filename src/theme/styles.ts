import { StyleSheet } from 'react-native';
import texts from './texts';
import buttons from './buttons';
import containers from './containers';
import modals from './modals';

const styles = StyleSheet.create({
    ...texts,
    ...buttons,
    ...containers,
    ...modals,
});

export default styles;