import React from 'react';
import { View, Text } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
// containers
import SignUpRedirectToSignIn from 'src/modules/auth/containers/SignUpRedirectToSignIn';
// components
import Spinner from 'src/components/Spinner';
import Button from 'src/components/Buttons/Button';
import StaticProgressCircle from 'src/modules/core/components/StaticProgressCircle';
import TextField from 'src/components/Fields/TextField';
import SelectField from 'src/components/Fields/SelectField';
// selector
import { getIsFetchingSignup } from 'src/selectors/user';
// utils
import { createReduxFormSchemaValidator } from 'src/services/helpers';
// enums
import {
  cities,
  industryOptionList,
  companyRoles,
} from 'src/components/Fields/enums';
// styles
import styles from './SignUpSecondStepContainer.styled';

function SignUpSecondStepContainer({ onSubmit, handleSubmit }) {
  const isFetchingSignup = useSelector(getIsFetchingSignup);

  const submitHandler = (...props) => {
    if (!isFetchingSignup) {
      handleSubmit(onSubmit)(...props);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <View style={styles.titleContainer}>
          <StaticProgressCircle progress={2 / 2} text="2 of 2" />
          <Text style={styles.titleText}>About Your Business</Text>
        </View>
        <Field
          name={'companyName'}
          component={TextField}
          label={'COMPANY NAME'}
          inputProps={{
            autoCapitalize: 'none',
          }}
          inputStyle={styles.input}
        />
        <Field
          name={'position'}
          component={SelectField}
          label={'WHICH POSITION BEST DESCRIBES YOUR ROLE?'}
          title={'Which position best describes your role?'}
          options={companyRoles}
          formControlStyles={styles.row}
        />
        <Field
          name={'industry'}
          component={SelectField}
          label={'INDUSTRY'}
          title={'Industry'}
          options={industryOptionList}
          formControlStyles={styles.row}
        />
        <Field
          name={'city'}
          component={SelectField}
          label={'COMPANY HEADQUARTERS LOCATION'}
          title={'Company Headquarters Location'}
          options={cities}
          formControlStyles={styles.row}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Button type="orange" style={styles.button} onPress={submitHandler}>
          <Spinner isFetching={isFetchingSignup} color="#fff">
            <Text style={styles.buttonText}>Sign Up</Text>
          </Spinner>
        </Button>
        <SignUpRedirectToSignIn />
      </View>
    </View>
  );
}

const validationSchema = yup.object().shape({
  companyName: yup.string().required('Required'),
  position: yup.string().required('Required'),
  industry: yup.string().required('Required'),
  city: yup.string().required('Required'),
});

export const formName = 'signUpSecondStep';

export default reduxForm({
  form: formName,
  destroyOnUnmount: false,
  validate: createReduxFormSchemaValidator(validationSchema),
})(SignUpSecondStepContainer);
