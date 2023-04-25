import { StyleSheet } from 'react-native';
// styles
import authStyles from 'src/assets/jss/components/auth';
import { backgroundAuthColor, blackColor } from 'src/assets/jss/styles';

export default StyleSheet.create({
  ...authStyles,
  siginScreenContainer: {
    flex: 1,
    backgroundColor: backgroundAuthColor,
  },
  button: { marginBottom: 10 },
  infoText: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 15,
    textAlign: 'center',
    lineHeight: 18,
    color: blackColor,
  },
  linkingText: {
    color: blackColor,
    textDecorationLine: 'underline',
  },
  extraLink: {
    color: blackColor,
    lineHeight: 18,
    letterSpacing: 0,
    fontSize: 15,
  },
  logoContainer: {
    width: '100%',
    padding: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
