import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  inputsContainer: {},
  titleContainer: {
    paddingLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  titleText: {
    paddingLeft: 15,
    paddingBottom: 6,
    fontFamily: 'lato-bold',
    fontSize: 20,
    lineHeight: 18,
    color: '#333333',
  },
  input: {
    height: 18,
    paddingBottom: 0,
  },
  fullNameContainer: {
    flexDirection: 'row',
  },
  row: {
    marginTop: 25,
  },
  bottomContainer: {
    marginTop: 30,
    marginBottom: 40,
  },
  button: {
    marginBottom: 25,
  },
  buttonText: {
    fontFamily: 'lato',
    fontSize: 17,
    lineHeight: 23,
    color: '#ffffff',
  },
});
