import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import * as yup from 'yup';
// core components
import TextField from 'src/components/Fields/TextField';
// services
import NavigationService from 'src/services/NavigationService';
// utils
import { createReduxFormSchemaValidator } from 'src/services/helpers';
// styles
import authStyles from 'src/assets/jss/components/auth';
import { blackColor } from 'src/assets/jss/styles';

const styles = StyleSheet.create({
  ...authStyles,
  field: {
    marginTop: 61,
  },
  input: {
    color: blackColor,
    paddingTop: 0,
    paddingBottom: 0,
    height: 18,
  },
  titleStyle: {
    color: blackColor,
  },
  forgotPasswordText: {
    color: blackColor,
    letterSpacing: 0,
    lineHeight: 18,
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  endAdornment: {
    alignItems: 'flex-end',
  },
});

function SignInForm() {
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
        inputStyle={styles.input}
      />
      <Field
        name={'password'}
        component={TextField}
        label={'PASSWORD'}
        inputProps={{
          autoComplete: 'password',
          secureTextEntry: true,
          autoCapitalize: 'none',
          placeholder: '',
        }}
        formControlStyles={styles.field}
        inputStyle={styles.input}
        endAdornment={
          <View style={styles.endAdornment}>
            <TouchableWithoutFeedback
              onPress={() => NavigationService.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password</Text>
            </TouchableWithoutFeedback>
          </View>
        }
      />
    </View>
  );
}

export const formName = 'signin';

const validationSchema = yup.object().shape({
  email: yup.string().required('Required'),
  password: yup.string().required('Required'),
});

export default reduxForm({
  form: formName,
  validate: createReduxFormSchemaValidator(validationSchema),
})(SignInForm);
