import { Platform, StyleSheet } from 'react-native';
import { blackColor, primaryColor } from 'src/assets/jss/styles';

export default StyleSheet.create({
  container: {
    width: 240,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 12,
    paddingBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(48, 49, 51)',
        shadowOffset: {
          height: 16,
          width: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 24,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  infoContainer: {
    flexDirection: 'row',
  },
  image: {
    borderRadius: 50,
    width: 54,
    height: 54,
  },
  textInfoContainer: {
    maxHeight: 56,
    paddingLeft: 7,
    flexShrink: 1,
  },
  titleText: {
    color: blackColor,
    fontFamily: 'lato-bold',
    fontSize: 16,
    lineHeight: 18,
    marginBottom: 3,
  },
  defaultText: {
    color: blackColor,
    fontSize: 14,
    lineHeight: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    maxWidth: 100,
    marginBottom: 0,
    fontSize: 17,
    lineHeight: 23,
  },
  profileButton: {
    marginRight: 8,
  },
  profileButtonText: {
    color: primaryColor[500],
    fontSize: 17,
    lineHeight: 23,
  },
  partnerButton: {
    marginLeft: 8,
  },
  partnerButtonText: {
    color: 'white',
    fontSize: 17,
    lineHeight: 23,
  },
});
