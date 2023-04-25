import { StyleSheet, Platform } from 'react-native';

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
  },
  infoContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  field: {
    marginBottom: 30,
  },
  shadow: {
    marginTop: 4,
    marginBottom: 4,
    marginLeft: -20,
    marginRight: -20,
    height: 1,
    borderTopColor: '#000',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -20,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  buttonsContainer: {
    marginLeft: -21,
    marginRight: -21,
    height: 76,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width: 101,
    marginBottom: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
  },
});
