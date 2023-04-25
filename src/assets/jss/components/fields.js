import { StyleSheet } from 'react-native';
import { blackColor, coolGrey } from '../styles';

export const photoField = StyleSheet.create({
  addPhotoContainer: {
    borderWidth: 1,
    borderColor: 'rgb(151, 151, 151)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoText: {
    fontSize: 11,
    lineHeight: 14,
    color: coolGrey,
    letterSpacing: 0,
    marginTop: 6,
  },
  label: {
    fontFamily: 'lato-bold',
    color: blackColor,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
    marginBottom: 10,
  },
  info: {
    marginTop: -5,
    marginBottom: 20,
    fontStyle: 'italic',
    fontSize: 12,
    lineHeight: 18,
    color: blackColor,
    opacity: 0.8,
  },
  imageContainer: {
    width: '100%',
    marginBottom: 46,
  },
  portfolioContainer: {
    flexDirection: 'row',
  },
});
