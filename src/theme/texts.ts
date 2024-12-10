import { StyleSheet } from 'react-native';
import colors from './colors';

const texts = StyleSheet.create({
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.gray.shade400,
    marginVertical: 10,
  },
  subText: {
    fontSize: 18,
    color: colors.gray.shade500,
    textAlign: 'center',
    marginBottom: 10,
  },
  contentText: {
    fontSize: 14,
    color: colors.gray.shade500,
    marginBottom: 5,
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.gray.shade400,
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -80 }],
  },
  orText: {
    alignSelf: 'center',
    marginTop: 20,
    padding: 30,
    color: colors.gray.shade400,
  },
  screenName: {
    fontSize: 18,
    color: colors.gray.shade400,
    position: 'absolute',
    bottom: -67,
    alignSelf: 'center',
  },
  errorText: {
    fontSize: 16,
    color: colors.red.shade100,
    alignSelf: 'center',
  },
  successText: {
    fontSize: 16,
    color: colors.yellow.shade100,
    alignSelf: 'center',
  },
  loadingText: {
    textAlign: 'center',
    marginVertical: 20,
  },
  cardText: {
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.gray.shade400,
  },
});

export default texts;
