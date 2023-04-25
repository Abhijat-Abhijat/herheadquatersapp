import { StyleSheet } from 'react-native';
// styles
import { primaryColor } from 'src/assets/jss/styles';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  ownCollaborationIcons: {
    paddingBottom: 20,
  },
  iconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 14,
  },
  iconItem: {
    alignItems: 'center',
    flexShrink: 1,
    width: 155,
  },
  iconText: {
    color: primaryColor.main,
    fontSize: 13,
    letterSpacing: 0,
    textAlign: 'center',
  },
});
