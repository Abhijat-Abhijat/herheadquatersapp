import { StyleSheet } from 'react-native';
import { blackColor } from 'src/assets/jss/styles';

export default StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FDD9B2',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 6,
    paddingLeft: 6,
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 52,
  },
  textWrapper: {
    paddingLeft: 7,
    paddingRight: 10,
    flexShrink: 1,
  },
  title: {
    fontFamily: 'lato-bold',
    color: blackColor,
  },
  message: {
    color: blackColor,
  },
  closeIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
  },
  closeIcon: {
    padding: 5,
    color: blackColor,
  },
});
