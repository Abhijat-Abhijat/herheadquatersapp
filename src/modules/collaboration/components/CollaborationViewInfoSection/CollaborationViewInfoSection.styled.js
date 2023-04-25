import { StyleSheet } from 'react-native';
// styles
import { blackColor } from 'src/assets/jss/styles';

export default StyleSheet.create({
  insideContainer: {
    paddingLeft: 20,
    paddingRight: 20,
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
