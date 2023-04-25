import React, { useRef, useEffect } from 'react';
import {
  Alert,
  ScrollView,
  View,
  Text,
  Animated,
  StyleSheet,
} from 'react-native';
import { reduxForm, formValueSelector, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as yup from 'yup';
// components
import Spinner from 'src/components/Spinner';
import TextField from 'src/components/Fields/TextField';
import PhotoField from 'src/components/Fields/PhotoField';
import SelectField from 'src/components/Fields/SelectField';
import BooleanButtonSwitchField from 'src/modules/core/containers/fields/BooleanButtonSwitchField';
import LimitedTextField from 'src/modules/core/containers/fields/LimitedTextField';
import MultipleCheckboxField from 'src/modules/core/containers/fields/MultipleCheckboxField';
import RadioCheckboxField from 'src/modules/core/containers/fields/RadioCheckboxField';
import DatePickerField from 'src/components/Fields/DatePickerField';
import Button from 'src/components/Buttons/Button';
// data
import {
  states,
  collaborationTypeOptions,
  industryOptionList,
  perks,
} from 'src/components/Fields/enums';
import { DateSelectorExtractor } from 'src/services/DateExtractor';
// helpers
import { createReduxFormSchemaValidator } from 'src/services/helpers';
import { FormScrollService } from 'src/services/FormScrollService';
// selectors
import { getIsFetchingCollaboration } from 'src/selectors/collaboration';
// styles
import { primaryColor } from 'src/assets/jss/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  field: {
    marginBottom: 15,
  },
  image: {
    width: 97,
    height: 97,
  },
  buttonsContainer: {
    marginLeft: -21,
    marginRight: -21,
    height: 76,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width: 101,
    marginBottom: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
  },
});

const formScrollService = new FormScrollService();

function CollaborationEditForm({
  remote,
  change,
  onSubmit,
  onCancel,
  handleSubmit,
  isSubmitting,
}) {
  const animationDuration = 500;
  const locationDefaultHeight = 206;

  const locationHeight = useRef(new Animated.Value(0));
  const locationOpacity = useRef(new Animated.Value(0));

  const goBack = () => {
    Alert.alert(
      'Leave the page',
      'Are you sure you want to leave the page?',
      [
        {
          text: 'Leave',
          style: 'cancel',
          onPress: () => onCancel(),
        },
        {
          text: 'Stay',
          onPress: () => null,
        },
      ],
      { cancelable: true },
    );
  };

  useEffect(() => {
    if (!remote) {
      Animated.timing(locationHeight.current, {
        toValue: locationDefaultHeight,
        duration: animationDuration,
        useNativeDriver: false,
      }).start();

      Animated.timing(locationOpacity.current, {
        toValue: 1,
        duration: animationDuration + 200,
        useNativeDriver: false,
      }).start();
    } else {
      change('city', undefined);
      change('state', undefined);

      Animated.timing(locationHeight.current, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: false,
      }).start();

      Animated.timing(locationOpacity.current, {
        toValue: 0,
        duration: animationDuration - 300,
        useNativeDriver: false,
      }).start();
    }
  }, [remote, change, locationHeight, locationOpacity]);

  useEffect(() => {
    return () => {
      formScrollService.reset();
    };
  }, []);

  const imageInfoText = `Select a photo to highlight your partnership opportunity.
Hint: avoid using logos and photos with text.`;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      ref={formScrollService.setContainerRef}
    >
      <Field
        name="title"
        component={TextField}
        formControlStyles={styles.field}
        label="PARTNERSHIP TITLE"
        formControlProps={{
          onLayout: ({ nativeEvent }) =>
            formScrollService.addField('title', nativeEvent.layout),
        }}
      />
      <Field
        name="remote"
        component={BooleanButtonSwitchField}
        label="PARTNERSHIP LOCATION"
        info="Does this partnership require a local partner or can they be anywhere in the country?"
        trueOptionLabel="National"
        falseOptionLabel="Local"
        formControlStyles={styles.field}
        inverted
        formControlProps={{
          onLayout: ({ nativeEvent }) =>
            formScrollService.addField('remote', nativeEvent.layout),
        }}
      />
      <Animated.View
        style={[
          { marginBottom: 10 },
          {
            height: locationHeight.current,
            opacity: locationOpacity.current,
          },
        ]}
      >
        <Field
          name="city"
          component={TextField}
          formControlStyles={styles.field}
          label="City"
          formControlProps={{
            onLayout: ({ nativeEvent }) =>
              formScrollService.addField('city', nativeEvent.layout),
          }}
        />
        <Field
          name="state"
          component={SelectField}
          formControlStyles={styles.field}
          label="STATE"
          options={states}
          formControlProps={{
            onLayout: ({ nativeEvent }) =>
              formScrollService.addField('state', nativeEvent.layout),
          }}
        />
      </Animated.View>
      <Field
        name="photo"
        component={PhotoField}
        label="FEATURED IMAGE"
        info={imageInfoText}
        imageStyle={styles.image}
        standalone
        formControlProps={{
          onLayout: ({ nativeEvent }) =>
            formScrollService.addField('photo', nativeEvent.layout),
        }}
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
      <Field
        name="startDate"
        component={DatePickerField}
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
        component={DatePickerField}
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
      <Spinner isFetching={isSubmitting} onCenter>
        <View style={styles.buttonsContainer}>
          <Button
            onPress={goBack}
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
            <Text style={styles.buttonText}>Update</Text>
          </Button>
        </View>
      </Spinner>
    </ScrollView>
  );
}

const validationSchema = yup.object().shape({
  title: yup.string().required('Required'),
  remote: yup.boolean().required(),
  city: yup.string().when('remote', {
    is: false,
    then: yup.string().required('Required'),
  }),
  state: yup.string().when('remote', {
    is: false,
    then: yup.string().required('Required'),
  }),
  photo: yup.object().required('Required'),
  overview: yup.string().required('Required'),
  type: yup.string().required('Required'),
  industry: yup.array().required('Required').min(1, 'Required'),
  startDate: yup.string().required('Required'),
  endDate: yup.string().required('Required'),
  totalPartnership: yup.string().required('Required'),
});

const formName = 'collaborationEdit';

const CollaborationEditReduxForm = reduxForm({
  form: formName,
  validate: createReduxFormSchemaValidator(validationSchema),
  onSubmitFail: (errors) => {
    formScrollService.scrollToErrorField(errors);
  },
})(CollaborationEditForm);

const formSelector = formValueSelector(formName);

function mapStateToProps(state) {
  return {
    remote: formSelector(state, 'remote'),
    isSubmitting: getIsFetchingCollaboration(state).create,
  };
}

export default connect(mapStateToProps)(CollaborationEditReduxForm);
