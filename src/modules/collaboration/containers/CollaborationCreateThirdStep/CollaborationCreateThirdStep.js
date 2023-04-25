import React, { useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
// components
import Spinner from 'src/components/Spinner';
import StaticProgressCircle from 'src/modules/core/components/StaticProgressCircle';
import InformationText from 'src/modules/core/components/InformationText';
import SelectField from 'src/components/Fields/SelectField';
import MultipleCheckboxField from 'src/modules/core/containers/fields/MultipleCheckboxField';
import TextField from 'src/components/Fields/TextField';
import Button from 'src/components/Buttons/Button';
// selectors
import { selectIsSubmittingCollaboration } from 'src/selectors/collaboration';
// data
import { perks } from 'src/components/Fields/enums';
import { DateSelectorExtractor } from 'src/services/DateExtractor';
// helpers
import { FormScrollService } from 'src/services/FormScrollService';
import { createReduxFormSchemaValidator } from 'src/services/helpers';
// styles
import styles from './CollaborationCreateThirdStep.styled';
import { primaryColor } from 'src/assets/jss/styles';

const formScrollService = new FormScrollService();

function CollaborationCreateThirdStep({ onSubmit, onCancel, handleSubmit }) {
  const isSubmitting = useSelector(selectIsSubmittingCollaboration);

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
          <StaticProgressCircle progress={3 / 4} text="3 of 4" />
        </View>
        <Text style={styles.title}>Logistic Details</Text>
      </View>
      <InformationText
        style={styles.infoContainer}
        text="Provide your timeline and incentives to your potential partner!"
      />
      <Field
        name="startDate"
        component={SelectField}
        label="START DATE"
        formControlStyles={styles.field}
        options={DateSelectorExtractor.startCollaborationDateTypes}
        formControlProps={{
          onLayout: ({ nativeEvent }) =>
            formScrollService.addField('startDate', nativeEvent.layout),
        }}
      />
      <Field
        name="endDate"
        component={SelectField}
        label="PARTNERSHIP LENGTH"
        formControlStyles={styles.field}
        options={DateSelectorExtractor.endCollaborationDateTypes}
        formControlProps={{
          onLayout: ({ nativeEvent }) =>
            formScrollService.addField('endDate', nativeEvent.layout),
        }}
      />
      <Field
        name="perks"
        component={MultipleCheckboxField}
        label="I’M OFFERING..."
        formControlStyles={styles.field}
        options={perks}
        formControlProps={{
          onLayout: ({ nativeEvent }) =>
            formScrollService.addField('perks', nativeEvent.layout),
        }}
      />
      <Field
        name="totalPartnership"
        component={TextField}
        label="TOTAL PARTNERSHIP VALUE"
        formControlStyles={styles.field}
        info={
          'This is the total value of the all of the perks you’re offering to the business/person you partner with.'
        }
        formControlProps={{
          onLayout: ({ nativeEvent }) =>
            formScrollService.addField('totalPartnership', nativeEvent.layout),
        }}
      />
      <View style={styles.shadow} />
      <Spinner isFetching={isSubmitting} onCenter>
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
            <Text style={styles.buttonText}>Post</Text>
          </Button>
        </View>
      </Spinner>
    </ScrollView>
  );
}

const validationSchema = yup.object().shape({
  startDate: yup.string().required('Required'),
  endDate: yup.string().required('Required'),
  totalPartnership: yup
    .string()
    .required('Required')
    .min(3, 'Please enter partnership value.')
    .matches(/^[0-9\$\.,\ ]+$/, 'Please enter numerical value only.'),
});

export const formName = 'collaborationCreateStepThree';

export default reduxForm({
  form: formName,
  destroyOnUnmount: false,
  validate: createReduxFormSchemaValidator(validationSchema),
  initialValues: {
    totalPartnership: '$ ',
  },
  onSubmitFail: (errors) => {
    formScrollService.scrollToErrorField(errors);
  },
})(CollaborationCreateThirdStep);
