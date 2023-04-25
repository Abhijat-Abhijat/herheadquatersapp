import { StyleSheet } from 'react-native';

export const itemHorizontalMargin = 15;

export const styles = StyleSheet.create({
  container: {},
  slide: {
    borderRadius: 4,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.31,
    shadowOffset: {
      height: 1,
    },
    shadowRadius: 2,
    backgroundColor: '#fff',
    marginLeft: 5,
    marginRight: 5,
  },
  slideContent: {
    paddingTop: 10,
    paddingBottom: 15,
    paddingRight: 15,
    paddingLeft: 15,
  },
  website: {
    alignItems: 'center',
    marginBottom: 15,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  icon: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  paginationDot: { height: 8, width: 8 },
});
