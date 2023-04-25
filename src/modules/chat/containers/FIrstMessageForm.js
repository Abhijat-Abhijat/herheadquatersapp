import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { reduxForm, Field } from 'redux-form';
// components
import Button from '../../../components/Buttons/Button';
import TextField from '../../../components/Fields/TextField';
import SelectField from '../../../components/Fields/SelectField';
import DatePickerField from '../../../components/Fields/DatePickerField';
// actions
import { sendFirstMessage } from '../actions';
// constants
import { collaborationTypeOptions } from '../../../components/Fields/enums';

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 30,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
  },
  field: {
    marginBottom: 30,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 17,
  },
});

const descriptionProps = { multiline: true, blurOnSubmit: true };

function FirstMessageForm(props) {
  const { userId, dispatch, handleSubmit } = props;

  const onSubmit = useCallback(
    (values) => {
      dispatch(sendFirstMessage(values, userId));
    },
    [userId, dispatch],
  );

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Field
          name="title"
          component={TextField}
          label="PARTNERSHIP TITLE"
          formControlStyles={styles.field}
        />
        <Field
          name="type"
          component={SelectField}
          label="TYPE"
          formControlStyles={styles.field}
          options={collaborationTypeOptions}
        />
        <Field
          name="startDate"
          component={DatePickerField}
          label="START DATE"
          formControlStyles={styles.field}
        />
        <Field
          name="endDate"
          component={DatePickerField}
          label="END DATE"
          formControlStyles={styles.field}
        />
        <Field
          name="location"
          component={TextField}
          label="LOCATION"
          formControlStyles={styles.field}
        />
        <Field
          name="description"
          component={TextField}
          label="BRIEF DETAILS"
          formControlStyles={styles.field}
          inputProps={descriptionProps}
        />
        <Button type="primary" onPress={handleSubmit(onSubmit)}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </Button>
      </View>
    </ScrollView>
  );
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'You should provide title!';
  }
  if (!values.type) {
    errors.type = 'You should provide type!';
  }
  if (!values.startDate) {
    errors.startDate = 'You should provide startDate!';
  }
  if (!values.endDate) {
    errors.endDate = 'You should provide endDate!';
  }
  if (!values.location) {
    errors.location = 'You should provide location!';
  }
  if (!values.description) {
    errors.description = 'You should provide description!';
  }

  return errors;
}

export default reduxForm({
  form: 'firstMessage',
  validate,
})(FirstMessageForm);
