import { StyleSheet } from 'react-native';

import { primaryColor } from '../styles';

export const titleHeader = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: primaryColor.main,
    height: '50%',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
});
