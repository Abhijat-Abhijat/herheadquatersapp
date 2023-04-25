import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { View, StyleSheet } from 'react-native';
import * as yup from 'yup';
// core components
import TextField from 'src/components/Fields/TextField';
// utils
import { createReduxFormSchemaValidator } from 'src/services/helpers';
// styles
import authStyles from 'src/assets/jss/components/auth';

const styles = StyleSheet.create({
  ...authStyles,
});

function ForgotPasswordForm() {
  return (
    <View style={styles.formContainer}>
      <Field
        name={'email'}
        component={TextField}
        label={'COMPANY EMAIL'}
        inputProps={{
          keyboardType: 'email-address',
          autoComplete: 'email',
          autoCapitalize: 'none',
          placeholder: 'example@example.com',
        }}
      />
    </View>
  );
}

export const formName = 'forgotPassword';

const validationSchema = yup.object().shape({
  email: yup.string().required('Required'),
});

export default reduxForm({
  form: formName,
  validate: createReduxFormSchemaValidator(validationSchema),
})(ForgotPasswordForm);
