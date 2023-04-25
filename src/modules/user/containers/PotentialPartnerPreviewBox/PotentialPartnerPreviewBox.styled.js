import { StyleSheet } from 'react-native';
import { blackColor, primaryColor } from 'src/assets/jss/styles';

export default StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: 'black',
    shadowOpacity: 0.31,
    shadowOffset: {
      height: 1,
    },
    shadowRadius: 2,
    elevation: 2,
  },
  imageWrapper: {
    height: 200,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  separator: {
    height: 1,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: primaryColor.main,
  },
  aboutContainer: {
    marginTop: 7,
    marginBottom: 7,
    paddingRight: 20,
    paddingLeft: 20,
  },
  about: {
    color: blackColor,
    fontSize: 13,
    lineHeight: 18,
  },
});
