import { Dimensions } from 'react-native';

export const primaryColor = {
  light: 'rgb(0, 226, 237)', // #00e2ed
  main: 'rgb(2, 186, 194)', // #02bac2
  mainBlended: (opacity) => `rgba(2, 186, 194, ${opacity})`,
  500: 'rgb(2, 186, 194)', // #02bac2
  dark: 'rgb(0, 131, 137)', //#008389
};

export const secondaryColor = {
  400: 'rgb(56, 224, 111)', // #38e06f
  main: 'rgb(127, 213, 133)', // #7fd585
  500: 'rgb(127, 213, 133)', // #7fd585
  600: 'rgb(125, 206, 130)', // #7dce82
  700: 'rgb(107, 176, 111)', // #6bb06f
};

export const backgroundAuthColorBlended = (opacity) =>
  `rgba(197, 227, 230, ${opacity})`; // #c5e3e6cc
export const backgroundAuthColor = backgroundAuthColorBlended(0.8);

export const dangerColor = '#ff0000';
export const successColor = '#00ff00';
export const blackColor = 'rgb(38, 38, 38)'; // #262626
export const blackColorBlended = (opacity) => `rgba(38, 38 ,38, ${opacity})`;

export const contrastText = '#fff';
export const contrastTextInactive = 'rgba(255, 255, 255, 0.5)';
export const appBackgroundColor = 'rgb(239, 239, 244)'; // #efeff4
export const lightBlueGrey = 'rgb(200, 199, 204)'; // #c8c7cc
export const coolGrey = 'rgb(161, 166, 166)'; // #a1a6a6
export const paleGrey = 'rgb(239,239,244)'; // #efeff4
export const coral = '#f74646';
export const carmine = 'rgb(154,3,30)'; // #9a031e
export const orangeColor = 'rgb(249, 160, 63)'; // #f9a03f

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width,
};
