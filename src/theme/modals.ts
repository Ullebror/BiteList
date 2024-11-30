import { StyleSheet } from 'react-native';
import colors from './colors';

const modals = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray.shade300,
    opacity: 0.8,
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    color: colors.gray.shade500,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    color: colors.gray.shade500,
    marginBottom: 15,
  },
});

export default modals;
