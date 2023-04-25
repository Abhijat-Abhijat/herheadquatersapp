import React, { useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
// components
import Spinner from 'src/components/Spinner';
import TextField from 'src/components/Fields/TextField';
import SuggestedField from './SuggestedField';
import Button from 'src/components/Buttons/Button';
// actions
import { submitCollaborationAfterReviewRequest } from 'src/modules/collaborationReview/collaborationReview.actions';
// selectors
import { selectCollaborationReviewIsSubmitting } from 'src/modules/collaborationReview/collaborationReview.selectors';
// utils
import {
  fieldStatusMap,
  fieldTypeMap,
} from './SuggestedField/SuggestedField.utils';
// styles
import styles from './CollaborationReviewForm.styled';
import { primaryColor } from 'src/assets/jss/styles';

const fields = [
  {
    name: 'title',
    title: 'PARTNERSHIP TITLE',
    type: fieldTypeMap.TEXT,
  },
  {
    name: 'photo',
    title: 'FEATURED IMAGE',
    type: fieldTypeMap.IMAGE,
  },
  {
    name: 'overview',
    title: 'PARTNERSHIP DETAILS',
    type: fieldTypeMap.TEXT,
  },
  {
    name: 'industry',
    title: 'SEEKING (INDUSTRY)',
    type: fieldTypeMap.ARRAY,
  },
  {
    name: 'seeking',
    title: 'WHAT SPECIFIC ACTIVITIES WILL THIS PERSON DO?',
    type: fieldTypeMap.TEXT,
  },
  {
    name: 'perks',
    title: "I'M OFFERING",
    type: fieldTypeMap.ARRAY,
  },
  {
    name: 'totalPartnership',
    title: 'PARTNERSHIP VALUE',
    type: fieldTypeMap.TEXT,
  },
];

function CollaborationReviewForm(props) {
  const { review, onSuccess } = props;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const isSubmitting = useSelector(selectCollaborationReviewIsSubmitting);

  const [fieldsStatus, setFieldsStatus] = useState({
    title: 'undetermined',
    photo: 'undetermined',
    overview: 'undetermined',
    industry: 'undetermined',
    seeking: 'undetermined',
    perks: 'undetermined',
    totalPartnership: 'undetermined',
  });

  const changeFieldStatus = useCallback(
    (field) => {
      return (status) => setFieldsStatus({ ...fieldsStatus, [field]: status });
    },
    [fieldsStatus, setFieldsStatus],
  );

  const handleEditNavigation = () => {
    navigation.navigate('CollaborationEdit', {
      idCollaboration: review.collaboration._id,
    });
  };

  const handleSubmit = () => {
    const acceptedFields = Object.keys(fieldsStatus).reduce((acc, key) => {
      const isAccepted = fieldsStatus[key] === fieldStatusMap.ACCEPTED;

      if (isAccepted) {
        return [...acc, key];
      }

      return acc;
    }, []);

    dispatch(
      submitCollaborationAfterReviewRequest({
        review,
        acceptedFields,
        onSuccess,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View>
          <Text style={styles.titleText}>Partnership Review</Text>
          <Text style={styles.authorText}>
            {`sent from ${review.admin.firstName} at ${review.admin.companyName}`}
          </Text>
        </View>
        <View>
          <Text style={styles.dateText}>
            {`Received ${moment(review.updatedDate).fromNow()}`}
          </Text>
        </View>
      </View>

      <View style={styles.suggestedFieldContainer}>
        <Field
          name={'recommendation.feedback'}
          component={TextField}
          label={'General Feedback'}
          inputProps={{
            editable: false,
          }}
        />
      </View>

      {fields.map(({ name, title, type }) => {
        let recommendedData = review.recommendation[name];

        if (
          !recommendedData ||
          (Array.isArray(recommendedData) && recommendedData.length === 0)
        ) {
          return null;
        }

        const status = fieldsStatus[name];

        return (
          <SuggestedField
            key={name}
            style={styles.suggestedFieldContainer}
            title={title}
            type={type}
            originalName={`original.${name}`}
            recommendationName={`recommendation.${name}`}
            status={status}
            changeStatus={changeFieldStatus(name)}
          />
        );
      })}

      <View style={styles.buttonsContainer}>
        <Button
          type="secondary"
          styleButton={styles.button}
          onPress={handleEditNavigation}
          disabled={isSubmitting}
        >
          <Spinner isFetching={isSubmitting} color={primaryColor.main}>
            <Text style={[styles.buttonText, { color: primaryColor.main }]}>
              Edit Partnership Post
            </Text>
          </Spinner>
        </Button>

        <Button
          type="orange"
          styleButton={styles.button}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Spinner isFetching={isSubmitting} color="#fff">
            <Text style={[styles.buttonText, { color: '#fff' }]}>
              Submit Partnership Post
            </Text>
          </Spinner>
        </Button>
      </View>
    </View>
  );
}

const formName = 'collaborationReviewForm';

export default reduxForm({
  form: formName,
})(CollaborationReviewForm);
