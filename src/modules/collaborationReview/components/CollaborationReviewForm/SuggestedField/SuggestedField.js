import React from 'react';
import { View, Text } from 'react-native';
import { Field } from 'redux-form';
// components
import Button from 'src/components/Buttons/Button';
// utils
import {
  fieldStatusMap,
  fieldTypeMap,
  getComponentByType,
  getDefaultPropsByType,
  getFieldDataLabel,
} from './SuggestedField.utils';
// styles
import styles from './SuggestedField.styled';
import { primaryColor } from 'src/assets/jss/styles';

function SuggestedField(props) {
  const {
    type,
    title,
    originalName,
    recommendationName,
    status,
    changeStatus,
    style,
  } = props;

  const Component = getComponentByType(type);
  const defaultProps = getDefaultPropsByType(type);

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <View
        style={[
          styles.inputContainer,
          type === fieldTypeMap.IMAGE ? styles.photoTypeContainer : {},
        ]}
      >
        <Field
          name={originalName}
          component={Component}
          label={'Original'}
          formControlStyles={styles.inputOriginal}
          {...defaultProps}
        />
        <Field
          name={recommendationName}
          component={Component}
          label={'Recommended'}
          formControlStyles={styles.inputRecommended}
          {...defaultProps}
        />
      </View>

      {status === fieldStatusMap.UNDETERMINED && (
        <View style={styles.buttonContainer}>
          <Button
            type="secondary"
            styleButton={styles.button}
            onPress={() => changeStatus(fieldStatusMap.REJECTED)}
          >
            <Text style={[styles.buttonText, { color: primaryColor.main }]}>
              Reject
            </Text>
          </Button>
          <Button
            styleButton={styles.button}
            onPress={() => changeStatus(fieldStatusMap.ACCEPTED)}
          >
            <Text style={[styles.buttonText, { color: '#fff' }]}>Accept</Text>
          </Button>
        </View>
      )}

      {status === fieldStatusMap.REJECTED && (
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>Recommendation rejected.</Text>
          <Text style={styles.statusText}>
            {`The original ${getFieldDataLabel(
              type,
            )} will appear when you submit the post`}
          </Text>
          <Text
            style={styles.undoText}
            onPress={() => changeStatus(fieldStatusMap.UNDETERMINED)}
          >
            Undo
          </Text>
        </View>
      )}

      {status === fieldStatusMap.ACCEPTED && (
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>Recommendation accepted.</Text>
          <Text style={styles.statusText}>
            {`The new ${getFieldDataLabel(
              type,
            )} will appear when you submit the post`}
          </Text>
          <Text
            style={styles.undoText}
            onPress={() => changeStatus(fieldStatusMap.UNDETERMINED)}
          >
            Undo
          </Text>
        </View>
      )}
    </View>
  );
}

export default SuggestedField;
