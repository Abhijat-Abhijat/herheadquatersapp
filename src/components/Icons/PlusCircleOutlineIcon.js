import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
// components
import Icon from 'src/components/Icons/HerHeadquartersIcon';
// styles
import { primaryColor } from 'src/assets/jss/styles';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function PlusCircleOutlineIcon(props) {
  const {
    size = 56,
    containerColor = primaryColor.main,
    iconColor = '#fff',
    containerStyle,
    ...rest
  } = props;

  return (
    <TouchableOpacity
      {...rest}
      style={[
        styles.container,
        containerStyle,
        {
          height: size,
          width: size,
          borderRadius: size / 2,
          backgroundColor: containerColor,
        },
      ]}
    >
      <Icon
        name={'ios-add-circle-outline'}
        size={0.65 * size}
        color={iconColor}
      />
    </TouchableOpacity>
  );
}

export default PlusCircleOutlineIcon;
