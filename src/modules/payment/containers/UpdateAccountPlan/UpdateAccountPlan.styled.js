import { StyleSheet, Platform } from 'react-native';
// styles
import { blackColor, orangeColor } from 'src/assets/jss/styles';

const gapSize = 8;
const halfGap = gapSize / 2;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  currentAccountContainer: {
    marginBottom: 25,
    alignSelf: 'center',
  },
  currentAccountText: {
    display: 'flex',
    flex: 0,
    textAlign: 'center',
    fontFamily: 'lato-bold',
    fontSize: 16,
    lineHeight: 28,
    color: '#333333',
    paddingRight: 8,
    paddingLeft: 8,
    paddingBottom: 5,
    borderBottomColor: orangeColor,
    borderBottomWidth: 1,
  },
  tabsWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  firstTabContainer: {
    flex: 1,
    marginLeft: 0,
    marginRight: halfGap,
  },
  tabContainer: {
    flex: 1,
    marginLeft: halfGap,
    marginRight: halfGap,
  },
  lastTabContainer: {
    flex: 1,
    marginLeft: halfGap,
    marginRight: 0,
  },
  headerTabText: {
    fontFamily: 'lato-italic',
    fontSize: 11,
    lineHeight: 23,
    textAlign: 'center',
  },
  imageContainer: {
    marginTop: 30,
    backgroundColor: '#FFFFFF',
    paddingTop: 8,
    paddingLeft: 22,
    paddingRight: 22,
    paddingBottom: 21,
    alignItems: 'center',
    borderRadius: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        textShadowRadius: 3,
        shadowOffset: {
          width: 0,
          height: 1,
        },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  image: {
    justifyContent: 'center',
    resizeMode: 'contain',
    height: 200,
  },
  planAlias: {
    marginTop: 26,
    fontFamily: 'lato-bold',
    fontSize: 19,
    lineHeight: 23,
    color: blackColor,
  },
  advantagesContainer: {
    marginTop: 25,
    paddingLeft: 24,
    paddingRight: 10,
  },
  advantageContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  advantageIconContainer: { paddingRight: 8 },
  advantageText: {
    paddingTop: 3,
    fontSize: 16,
    lineHeight: 20,
    flexWrap: 'wrap',
    flex: 1,
  },
  priceText: {
    marginTop: 15,
    fontFamily: 'lato-bold',
    fontSize: 18,
    lineHeight: 28,
    color: '#333333',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 28,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 30,
  },
  trialText: {
    textAlign: 'center',
    fontFamily: 'lato-italic',
    fontSize: 16,
    lineHeight: 23,
  },
  button: { marginTop: 7, marginBottom: 0 },
  buttonText: {
    fontSize: 17,
    lineHeight: 23,
    color: '#ffffff',
  },
});
