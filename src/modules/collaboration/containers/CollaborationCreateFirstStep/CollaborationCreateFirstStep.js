import React, { useRef, useCallback, useEffect } from 'react';
import { ScrollView, View, Text, Animated } from 'react-native';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
// components
import StaticProgressCircle from 'src/modules/core/components/StaticProgressCircle';
import InformationText from 'src/modules/core/components/InformationText';
import PhotoFieldWithError from 'src/modules/core/containers/fields/PhotoFieldWithError';
import TextField from 'src/components/Fields/TextField';
import SelectField from 'src/components/Fields/SelectField';
import BooleanButtonSwitchField from 'src/modules/core/containers/fields/BooleanButtonSwitchField';
import Button from 'src/components/Buttons/Button';
// hooks
import useAlertOnBack from 'src/modules/core/hooks/useAlertOnBack';
// helpers
import { createReduxFormSchemaValidator } from 'src/services/helpers';
import { FormScrollService } from 'src/services/FormScrollService';
// data
import { states } from 'src/components/Fields/enums';
// styles
import styles from './CollaborationCreateFirstStep.styled';
import { primaryColor } from 'src/assets/jss/styles';

const formScrollService = new FormScrollService();

function CollaborationCreateFirstStep({
  onSubmit,
  onCancel,
  onLeave,
  change,
  handleSubmit,
  dirty,
}) {
  const remote = useSelector((state) => formSelector(state, 'remote'));

  const animationDuration = 500;
  const locationDefaultHeight = 206;

  const locationHeight = useRef(new Animated.Value(0));
  const locationOpacity = useRef(new Animated.Value(0));

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

  const handleLeave = useCallback(
    ({ forceBack }) => {
      forceBack();

      if (typeof onLeave === 'function') {
        onLeave();
      }
    },
    [onLeave],
  );

  useAlertOnBack(dirty, { handleLeave });

  const imageInfoText = `Select a photo to highlight your partnership opportunity.
Hint: avoid using logos and photos with text.`;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      ref={formScrollService.setContainerRef}
    >
      <View style={styles.titleContainer}>
        <View>
          <StaticProgressCircle progress={1 / 4} text="1 of 4" />
        </View>
        <Text style={styles.title}>Name Your Partnership</Text>
      </View>
      <InformationText
        style={styles.infoContainer}
        text="Tell us more! Give your partnership a catchy title to attract partners and provide your location preferences."
      />
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
          styles.animatedFields,
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
        component={PhotoFieldWithError}
        label="FEATURED IMAGE"
        info={imageInfoText}
        formControlStyles={styles.imageContainer}
        imageStyle={styles.image}
        standalone
        formControlProps={{
          onLayout: ({ nativeEvent }) =>
            formScrollService.addField('photo', nativeEvent.layout),
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
});

export const formName = 'collaborationCreateStepOne';

const formSelector = formValueSelector(formName);

const CollaborationCreateFirstStepForm = reduxForm({
  form: formName,
  destroyOnUnmount: false,
  initialValues: {
    remote: true,
  },
  validate: createReduxFormSchemaValidator(validationSchema),
  onSubmitFail: (errors) => {
    formScrollService.scrollToErrorField(errors);
  },
})(CollaborationCreateFirstStep);

export default CollaborationCreateFirstStepForm;
