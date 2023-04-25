import { StyleSheet } from 'react-native';
// styles
import { blackColor, primaryColor } from 'src/assets/jss/styles';

export default StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  container: {
    backgroundColor: '#fff',
    minHeight: '100%',
  },
  insideContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 44,
    paddingTop: 48,
  },
  iconsContainerOwn: {
    paddingTop: 15,
  },
  iconItem: {
    maxWidth: 108,
    alignItems: 'center',
  },
  iconText: {
    color: primaryColor.main,
    fontSize: 13,
    letterSpacing: 0,
    textAlign: 'center',
  },
  sectionTitleContainer: {
    backgroundColor: primaryColor.main,
    paddingLeft: 19,
    paddingTop: 18,
    paddingBottom: 18,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 15,
    letterSpacing: 0,
    lineHeight: 14,
    fontFamily: 'lato-bold',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    paddingTop: 15,
    paddingBottom: 20,
  },
  simpleText: {
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
  },
  label: {
    marginBottom: 1,
    fontFamily: 'lato-bold',
  },
  labelMargin: {
    marginBottom: 21,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 21,
    paddingBottom: 21,
    width: '80%',
  },
  spinnerContainer: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    marginTop: 100,
    justifyContent: 'center',
  },
  perksSeekingContainer: {
    paddingTop: 26,
    flexDirection: 'row',
  },
  perksContainer: {
    flex: 1,
  },
  seekingContainer: {
    flex: 1,
  },
  perkContainer: {
    marginLeft: 6,
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 25,
  },
  perkSeparator: {
    borderRadius: 50,
    backgroundColor: blackColor,
    width: 5,
    height: 5,
    marginRight: 10,
  },
  listTitle: {
    marginBottom: 3,
  },
  seekingOptionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
