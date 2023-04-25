import React from 'react';
import { Text, View } from 'react-native';
// styles
import styles from './ArrayField.styled';

function ArrayField(props) {
  const { input, label } = props;
  const array = Array.isArray(input?.value) ? input.value : [];

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.valuesContainer}>
        {array &&
          array.map((value) => {
            return (
              <Text key={value} style={styles.value}>
                {value}
              </Text>
            );
          })}
      </View>
    </View>
  );
}

export default ArrayField;
