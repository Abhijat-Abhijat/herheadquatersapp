import { StyleSheet } from 'react-native';
import { blackColor, primaryColor } from 'src/assets/jss/styles';

export default StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 65,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
  statusRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 14,
    lineHeight: 23,
    color: blackColor,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 100,
    backgroundColor: '#FDE3C5',
  },
  dateLabel: {
    fontSize: 11,
    lineHeight: 14,
    color: blackColor,
  },
  detailsRow: {
    marginTop: 15,
  },
  title: {
    fontFamily: 'lato-bold',
    fontSize: 13,
    lineHeight: 18,
    color: blackColor,
  },
  details: {
    fontSize: 11,
    lineHeight: 14,
    color: blackColor,
    paddingRight: 30,
  },
  feedbackSection: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'row',
  },
  leftColumn: {
    borderTopWidth: 1,
    borderTopColor: primaryColor.main,
    flex: 1,
  },
  feedbackTitle: {
    marginTop: 15,
    fontFamily: 'lato-bold',
    fontSize: 13,
    lineHeight: 18,
    color: blackColor,
    textDecorationLine: 'underline',
  },
  reviewAuthor: {
    marginTop: 10,
    fontSize: 11,
    lineHeight: 14,
    color: blackColor,
    fontFamily: 'lato-italic',
  },
  rightColumn: {
    paddingTop: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
