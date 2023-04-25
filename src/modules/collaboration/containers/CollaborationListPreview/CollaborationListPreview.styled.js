import { StyleSheet, Platform } from 'react-native';
import { blackColor, primaryColor } from 'src/assets/jss/styles';

export default StyleSheet.create({
  container: {
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 20,
    backgroundColor: 'white',
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
    width: '100%',
    height: '100%',
  },
  photoContainer: {
    height: 220,
    width: '100%',
  },
  content: {
    position: 'relative',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 33,
  },
  title: {
    fontFamily: 'lato-bold',
    fontSize: 18,
    lineHeight: 32,
    color: blackColor,
  },
  overview: {
    marginTop: 10,
    fontFamily: 'open-sans-regular',
    fontSize: 14,
    lineHeight: 28,
    opacity: 0.8,
    color: blackColor,
  },
  br: {
    marginTop: 15,
    height: 1,
    backgroundColor: primaryColor.main,
  },
  infoTitle: {
    marginTop: 8,
    fontFamily: 'lato-bold',
    fontSize: 14,
    lineHeight: 32,
    color: blackColor,
  },
  infoOptionContainer: {
    marginTop: 4,
  },
  infoOptionTitle: {
    fontFamily: 'open-sans-bold',
    fontSize: 13,
    lineHeight: 28,
    color: blackColor,
  },
  infoOptionValue: {
    fontFamily: 'open-sans-regular',
    fontSize: 13,
    lineHeight: 28,
    opacity: 0.8,
    color: blackColor,
  },
  favoriteContainer: {
    position: 'absolute',
    bottom: 10,
    right: 17,
  },
  userInfo: {
    marginTop: 5,
    paddingTop: 13,
    paddingBottom: 13,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarContainer: {},
  authorInfoContainer: {
    flex: 1,
    paddingLeft: 15,
  },
  topRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topRowLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
    flexShrink: 1,
  },
  topRowLeft: {
    marginRight: 10,
    fontSize: 15,
    lineHeight: 18,
    flexShrink: 1,
    fontFamily: 'lato-bold',
    color: blackColor,
  },
  topRowRight: {
    fontSize: 13,
    lineHeight: 18,
    color: '#C8C7CC',
    flexShrink: 1,
    textAlign: 'center',
    color: blackColor,
  },
  bottomRow: {
    marginTop: 3,
    fontSize: 13,
    lineHeight: 18,
    color: '#C8C7CC',
    color: blackColor,
  },
});
