import React from 'react';
import { View } from 'react-native';
// global styles
import {
  contrastText,
  primaryColor,
  appBackgroundColor,
} from 'src/assets/jss/styles';

export const defaultScreenOptions = {
  cardStyle: {
    backgroundColor: appBackgroundColor,
  },
  headerStyle: {
    backgroundColor: primaryColor.main,
  },
  headerTintColor: contrastText,
  headerTitleStyle: {
    color: contrastText,
    fontFamily: 'lato-bold',
    fontWeight: null,
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
  },
  headerBackTitleVisible: false,
  headerTitleAlign: 'center',
  headerRightContainerStyle: {
    paddingRight: 20,
  },
};

export const VERSION_3_defaultScreenOptions = {
  cardStyle: {
    backgroundColor: appBackgroundColor,
  },
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: primaryColor.main,
    },
    headerTintColor: contrastText,
    headerTitleStyle: {
      color: contrastText,
      fontFamily: 'lato-bold',
      fontWeight: null,
      fontSize: 17,
      lineHeight: 23,
      letterSpacing: 0,
    },
    headerTitleAlign: 'center',
    headerRight: () => <View />,
    headerRightContainerStyle: {
      paddingRight: 20,
    },
    headerBackTitle: null,
  },
};
