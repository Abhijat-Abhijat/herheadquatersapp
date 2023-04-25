import React from 'react';
import { useNavigation } from '@react-navigation/native';

function withNavigation(Component) {
  return (props) => {
    const navigation = useNavigation();

    return <Component {...props} navigation={navigation} />;
  };
}

export default withNavigation;
