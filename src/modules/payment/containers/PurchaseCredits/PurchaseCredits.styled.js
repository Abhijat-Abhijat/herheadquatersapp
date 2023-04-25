import { StyleSheet } from 'react-native';
// styles
import { blackColor } from 'src/assets/jss/styles';

export default StyleSheet.create({
  container: {
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
  },
  textContainer: {
    marginTop: 25,
  },
  text: {
    fontFamily: 'lato-italic',
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',
  },
  membershipText: {
    textDecorationLine: 'underline',
  },
  purchaseContainer: {
    flex: 1,
    marginTop: 70,
    justifyContent: 'space-between',
  },
  creditsNumberText: {
    fontFamily: 'lato-bold',
    fontSize: 13,
    lineHeight: 18,
    color: blackColor,
  },
  priceText: {
    marginTop: 25,
    fontFamily: 'lato-bold',
    fontSize: 18,
    lineHeight: 28,
    color: '#333333',
    textAlign: 'right',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    marginBottom: 0,
  },
  buttonText: {
    color: '#fff',
  },
  select: {
    color: blackColor,
    paddingTop: 15,
    paddingBottom: 15,
  },
  selectUnderline: {
    height: 1,
    backgroundColor: '#979797',
  },
});
