import { StyleSheet } from 'react-native';
import { contrastText } from '../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
  },
  buttonText: {
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
    color: contrastText,
  },
  formContainer: {
    width: '100%',
    marginBottom: 30,
  },
  formWrapper: {
    width: '100%',
    paddingBottom: 32,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },
  helpContainer: {
    paddingRight: 51,
    paddingLeft: 51,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomText: {
    color: '#fff',
    lineHeight: 18,
    letterSpacing: 0,
    fontSize: 15,
  },
  bottomLink: {
    textDecorationLine: 'underline',
  },
  titleContainer: {
    marginTop: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: 'lato-bold',
    lineHeight: 28,
    letterSpacing: 0,
    color: '#fff',
  },
});
