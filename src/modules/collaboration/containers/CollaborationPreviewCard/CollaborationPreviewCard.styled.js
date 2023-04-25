import { Platform, StyleSheet } from 'react-native';
import { blackColor, primaryColor } from 'src/assets/jss/styles';

export default StyleSheet.create({
  container: {
    width: 266,
    height: 160,
    backgroundColor: 'white',
    flexDirection: 'row',
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
  image: {
    width: 105,
    borderRadius: 4,
  },
  infoContainer: {
    flexShrink: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 14,
    paddingRight: 14,
  },
  title: {
    fontFamily: 'lato-bold',
    fontSize: 15,
    lineHeight: 24,
    color: blackColor,
  },
  company: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: blackColor,
  },
  divider: {
    marginTop: 7,
    marginBottom: 7,
    width: '100%',
    height: 1,
    backgroundColor: primaryColor.main,
  },
  valueText: {
    fontFamily: 'open-sans-bold',
    fontSize: 13,
    lineHeight: 19,
    color: blackColor,
  },
  value: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: 'normal',
    fontFamily: 'open-sans-regular',
    paddingRight: 22,
    color: blackColor,
  },
  favoriteContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
});
