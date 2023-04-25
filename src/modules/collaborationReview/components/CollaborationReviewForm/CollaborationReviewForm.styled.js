import { StyleSheet } from 'react-native';
import { blackColor } from 'src/assets/jss/styles';

export default StyleSheet.create({
  container: {},
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontFamily: 'lato-bold',
    fontSize: 20,
    lineHeight: 18,
    color: blackColor,
  },
  authorText: {
    paddingTop: 5,
    fontFamily: 'lato-italic',
    fontSize: 11,
    lineHeight: 14,
    color: blackColor,
  },
  dateText: {
    fontFamily: 'lato',
    fontSize: 11,
    lineHeight: 14,
    textAlign: 'right',
    color: blackColor,
  },
  suggestedFieldContainer: {
    marginTop: 30,
  },
  buttonsContainer: {
    marginTop: 20,
  },
  buttonText: {
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
  },
  button: {
    marginTop: 30,
    marginBottom: 0,
  },
});
