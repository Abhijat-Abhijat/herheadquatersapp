import React from 'react';
import { View, Text } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import * as yup from 'yup';
// containers
import SignUpRedirectToSignIn from 'src/modules/auth/containers/SignUpRedirectToSignIn';
// components
import Button from 'src/components/Buttons/Button';
import StaticProgressCircle from 'src/modules/core/components/StaticProgressCircle';
import TextField from 'src/components/Fields/TextField';
// utils
import { createReduxFormSchemaValidator } from 'src/services/helpers';
// styles
import styles from './SignUpFirstStepContainer.styled';

function SignUpFirstStepContainer({ onSubmit, handleSubmit }) {
  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <View style={styles.titleContainer}>
          <StaticProgressCircle progress={1 / 2} text="1 of 2" />
          <Text style={styles.titleText}>About You</Text>
        </View>
        <View style={styles.fullNameContainer}>
          <Field
            name="firstName"
            component={TextField}
            label={'FIRST NAME'}
            inputProps={{
              autoCompleteType: 'name',
            }}
            formControlStyles={{ marginRight: 15, flex: 1 }}
            inputStyle={styles.input}
          />
          <Field
            name={'lastName'}
            component={TextField}
            label={'LAST NAME'}
            inputProps={{
              autoCompleteType: 'name',
            }}
            formControlStyles={{
              marginLeft: 15,
              flex: 1,
            }}
            inputStyle={styles.input}
          />
        </View>
        <Field
          name={'email'}
          component={TextField}
          label={'COMPANY EMAIL'}
          inputProps={{
            keyboardType: 'email-address',
            autoCompleteType: 'email',
            autoCapitalize: 'none',
          }}
          formControlStyles={styles.row}
          inputStyle={styles.input}
        />
        <Field
          name={'password'}
          component={TextField}
          label={'PASSWORD'}
          inputProps={{
            autoCompleteType: 'password',
            secureTextEntry: true,
            autoCapitalize: 'none',
            placeholder: '',
          }}
          formControlStyles={styles.row}
          inputStyle={styles.input}
        />
        <Field
          name={'confirmPassword'}
          component={TextField}
          label={'CONFIRM PASSWORD'}
          inputProps={{
            autoCompleteType: 'password',
            secureTextEntry: true,
            autoCapitalize: 'none',
            placeholder: '',
          }}
          formControlStyles={styles.row}
          inputStyle={styles.input}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Button
          type="orange"
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Next</Text>
        </Button>
        <SignUpRedirectToSignIn />
      </View>
    </View>
  );
}

const validationSchema = yup.object().shape({
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  email: yup.string().required('Required').email(),
  password: yup
    .string()
    .required('Required')
    .min(7, 'Password must be greater than 6 characters and have one number')
    .matches(
      /[0-9]+/,
      'Password must be greater than 6 characters and have one number',
    ),
  confirmPassword: yup
    .string()
    .required('Required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const formName = 'signUpFirstStep';

export default reduxForm({
  form: formName,
  destroyOnUnmount: false,
  validate: createReduxFormSchemaValidator(validationSchema),
})(SignUpFirstStepContainer);
