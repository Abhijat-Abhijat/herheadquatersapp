import { StyleSheet } from 'react-native';
import { blackColor, primaryColor } from 'src/assets/jss/styles';

export default StyleSheet.create({
  container: {},
  title: {
    fontFamily: 'lato-bold',
    fontSize: 13,
    lineHeight: 18,
    color: blackColor,
  },
  inputContainer: {},
  photoTypeContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  inputOriginal: {
    marginTop: 10,
  },
  inputRecommended: {
    marginTop: 25,
  },
  buttonContainer: {
    marginTop: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 25,
    paddingLeft: 25,
    width: 'auto',
    marginBottom: 0,
  },
  buttonText: {
    fontSize: 17,
    lineHeight: 23,
  },
  statusContainer: {
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 35,
  },
  statusText: {
    fontFamily: 'lato-italic',
    lineHeight: 23,
    fontSize: 14,
    color: blackColor,
    textAlign: 'center',
  },
  undoText: {
    fontFamily: 'lato-bold',
    lineHeight: 23,
    fontSize: 14,
    color: primaryColor.main,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
