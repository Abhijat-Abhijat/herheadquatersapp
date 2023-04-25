import { StyleSheet } from 'react-native';
import { blackColor } from 'src/assets/jss/styles';

const borderPadding = 12;

export default StyleSheet.create({
  listRowContainer: { marginTop: 10 },
  rowListTitle: {
    paddingLeft: borderPadding,
    paddingRight: borderPadding,
    fontFamily: 'lato-bold',
    fontSize: 15,
    lineHeight: 18,
    color: blackColor,
  },
  rowList: {
    marginBottom: 10,
  },
  card: {
    marginRight: 10,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 4,
  },
  firstCard: {
    marginLeft: borderPadding,
  },
  lastCard: {
    marginRight: borderPadding,
  },
});
