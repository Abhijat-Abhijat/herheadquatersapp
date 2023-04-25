import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { StyleSheet, View, Text } from 'react-native';
// core components
import TextField from '../../Fields/TextField';
import Button from '../../Buttons/Button';
import Spinner from '../../../components/Spinner';

const formName = 'changePassword';

const styles = StyleSheet.create({
  field: {
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
  },
});

class ChangePasswordForm extends React.PureComponent {
  render() {
    return (
      <View>
        <Field
          name={'oldPassword'}
          component={TextField}
          label={'CURRENT PASSWORD'}
          inputProps={{
            autoComplete: 'password',
            secureTextEntry: true,
            autoCapitalize: 'none',
            placeholder: '',
          }}
          formControlStyles={styles.field}
        />
        <Field
          name={'newPassword'}
          component={TextField}
          label={'NEW PASSWORD'}
          inputProps={{
            autoComplete: 'password',
            secureTextEntry: true,
            autoCapitalize: 'none',
            placeholder: '',
          }}
          formControlStyles={styles.field}
        />
        <Field
          name={'confirmPassword'}
          component={TextField}
          label={'RE-TYPE NEW PASSWORD'}
          inputProps={{
            autoComplete: 'password',
            secureTextEntry: true,
            autoCapitalize: 'none',
            placeholder: '',
          }}
          formControlStyles={styles.field}
        />
        <Button onPress={() => this.props.submit()}>
          <Spinner isFetching={this.props.isFetching}>
            <Text style={styles.buttonText}>Change Password</Text>
          </Spinner>
        </Button>
      </View>
    );
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.oldPassword) {
    errors.oldPassword = 'Required';
  }

  if (!values.newPassword) {
    errors.newPassword = 'Required';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  }

  if (
    values.newPassword &&
    values.confirmPassword &&
    values.newPassword !== values.confirmPassword
  ) {
    errors.newPassword = `Not match`;
    errors.confirmPassword = 'Not match';
  }

  return errors;
};

ChangePasswordForm = reduxForm({
  form: formName,
  validate,
})(ChangePasswordForm);

export default ChangePasswordForm;
