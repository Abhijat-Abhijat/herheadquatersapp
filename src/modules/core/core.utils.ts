import RNDeviceInfo from 'react-native-device-info';

export const getApplicationVersion = () => {
  return RNDeviceInfo.getVersion();
}
