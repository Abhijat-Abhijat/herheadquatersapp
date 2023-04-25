import { StyleSheet, Platform } from 'react-native';
import { blackColor, coral, primaryColor } from 'src/assets/jss/styles';

export default StyleSheet.create({
  field: {
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
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
  image: {
    width: 97,
    height: 97,
    marginRight: 21,
  },
  avatarContainer: {
    marginBottom: 31,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 90,
    overflow: 'hidden',
  },
  modalRow: {
    paddingTop: 15,
    paddingBottom: 19,
    borderTopWidth: 1,
    borderTopColor: 'rgb(217,217,217)',
    width: '100%',
  },
  simpleButtonText: {
    color: primaryColor.main,
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
    textAlign: 'center',
  },
  removeButtonText: {
    color: coral,
  },
  inputWithStartAdornment: {
    flexDirection: 'row',
  },
  startAdornmentContainer: {
    borderBottomColor: 'rgb(151, 151, 151)',
    borderBottomWidth: 1,
  },
  startAdornmentText: {
    ...Platform.select({
      android: {
        paddingBottom: 10,
      },
      ios: {
        paddingBottom: 12,
      },
    }),
    color: blackColor,
    letterSpacing: 0,
    lineHeight: 18,
    fontFamily: 'lato-regular',
    fontSize: 13,
  },
  label: {
    fontFamily: 'lato-bold',
    color: blackColor,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
    ...Platform.select({
      android: {
        marginBottom: 12,
      },
      ios: {
        marginBottom: 9,
      },
    }),
  },
});
