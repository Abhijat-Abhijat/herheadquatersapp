import { StyleSheet } from 'react-native';
import { blackColor } from 'src/assets/jss/styles';

export default StyleSheet.create({
  container: {
    paddingTop: 35,
    paddingBottom: 35,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    fontFamily: 'lato-bold',
    color: blackColor,
    fontSize: 20,
    lineHeight: 18,
  },
  image: {
    resizeMode: 'contain',
    marginTop: 35,
  },
  text: {
    marginTop: 60,
    color: blackColor,
    fontSize: 15,
    lineHeight: 18,
  },
  buttonText: {
    fontSize: 17,
    lineHeight: 23,
  },
  upgradeButton: {
    marginTop: 30,
    marginBottom: 0,
  },
  newsfeedButton: {
    marginTop: 30,
    marginBottom: 0,
  },
});
