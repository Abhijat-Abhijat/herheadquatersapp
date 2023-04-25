import { StyleSheet } from 'react-native';
import { blackColor } from 'src/assets/jss/styles';

export default StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 15,
    paddingBottom: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color: blackColor,
  },
  infoTitle: {
    marginTop: 10,
    fontFamily: 'lato-bold',
    fontSize: 15,
    lineHeight: 18,
    color: blackColor,
  },
  infoText: {
    marginTop: 20,
    fontSize: 15,
    lineHeight: 18,
    color: blackColor,
  },
  imageContainer: {
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  image: { width: '100%', resizeMode: 'contain' },
  buttonText: {
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
  },
  skipReviewButton: {
    marginTop: 30,
    marginBottom: 0,
  },
  postReviewButton: {
    marginTop: 30,
    marginBottom: 30,
  },
});
