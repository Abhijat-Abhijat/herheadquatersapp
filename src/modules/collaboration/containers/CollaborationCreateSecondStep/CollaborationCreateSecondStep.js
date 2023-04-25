import React, { useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import * as yup from 'yup';
// components
import StaticProgressCircle from 'src/modules/core/components/StaticProgressCircle';
import InformationText from 'src/modules/core/components/InformationText';
import LimitedTextField from 'src/modules/core/containers/fields/LimitedTextField';
import MultipleCheckboxField from 'src/modules/core/containers/fields/MultipleCheckboxField';
import RadioCheckboxField from 'src/modules/core/containers/fields/RadioCheckboxField';
import Button from 'src/components/Buttons/Button';
// data
import {
  collaborationTypeOptions,
  industryOptionList,
} from 'src/components/Fields/enums';
// helpers
import { createReduxFormSchemaValidator } from 'src/services/helpers';
import { FormScrollService } from 'src/services/FormScrollService';
// styles
import styles from './CollaborationCreateSecondStep.styled';
import { primaryColor } from 'src/assets/jss/styles';

const formScrollService = new FormScrollService();

function CollaborationCreateSecondStep({ onSubmit, onCancel, handleSubmit }) {
  useEffect(() => {
    return () => {
      formScrollService.reset();
    };
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      ref={formScrollService.setContainerRef}
    >
      <View style={styles.titleContainer}>
        <View>
          <StaticProgressCircle progress={2 / 4} text="2 of 4" />
        </View>
        <Text style={styles.title}>Partnership Details</Text>
      </View>
      <InformationText
        style={styles.infoContainer}
        text="Tell us more! Provide details about the opportunity and how you'd like to partner below."
      />
      <Field
        name="overview"
        component={LimitedTextField}
        label="PARTNERSHIP DETAILS"
        inputProps={{
          multiline: true,
          maxLength: 700,
        }}
        formControlStyles={styles.field}
        formControlProps={{
          onLayout: ({ nativeEvent }) =>
            formScrollService.addField('overview', nativeEvent.layout),
        }}
      />
      <Field
        name="seeking"
        component={LimitedTextField}
        label="WHAT SPECIFIC ACTIVITIES WILL THIS PERSON DO? (optional)"
        inputProps={{
          multiline: true,
          maxLength: 600,
        }}
        formControlStyles={styles.field}
        formControlProps={{
          onLayout: ({ nativeEvent }) =>
            formScrollService.addField('seeking', nativeEvent.layout),
        }}
      />
      <Field
        name="type"
        component={RadioCheckboxField}
        label="PARTNERSHIP TYPE"
        formControlStyles={styles.field}
        options={collaborationTypeOptions}
        formControlProps={{
          onLayout: ({ nativeEvent }) =>
            formScrollService.addField('type', nativeEvent.layout),
        }}
      />
      <Field
        name="industry"
        component={MultipleCheckboxField}
        label="SEEKING"
        formControlStyles={styles.field}
        options={industryOptionList}
        formControlProps={{
          onLayout: ({ nativeEvent }) =>
            formScrollService.addField('industry', nativeEvent.layout),
        }}
      />
      <View style={styles.shadow} />
      <View style={styles.buttonsContainer}>
        <Button
          onPress={onCancel}
          type={'secondary'}
          styleButton={styles.button}
        >
          <Text style={[styles.buttonText, { color: primaryColor.main }]}>
            Cancel
          </Text>
        </Button>
        <Button
          onPress={handleSubmit(onSubmit)}
          type={'primary'}
          styleButton={styles.button}
        >
          <Text style={styles.buttonText}>Next</Text>
        </Button>
      </View>
    </ScrollView>
  );
}

const validationSchema = yup.object().shape({
  overview: yup.string().required('Required'),
  type: yup.string().required('Required'),
  industry: yup.array().required('Required').min(1, 'Required'),
});

export const formName = 'collaborationCreateStepTwo';

export default reduxForm({
  form: formName,
  initialValues: {
    industry: [],
  },
  destroyOnUnmount: false,
  validate: createReduxFormSchemaValidator(validationSchema),
  onSubmitFail: (errors) => {
    formScrollService.scrollToErrorField(errors);
  },
})(CollaborationCreateSecondStep);
