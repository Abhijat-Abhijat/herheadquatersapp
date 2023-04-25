import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as yup from 'yup';
// components
import TextField from 'src/components/Fields/TextField';
import Spinner from 'src/components/Spinner';
import Button from 'src/components/Buttons/Button';
// actions
import { sendCollaborationToFriendRequest } from 'src/modules/collaboration/collaboration.actions';
// selectors
import { selectIsFetchingSentCollaborationToFriend } from 'src/selectors/collaboration';
// helpers
import { createReduxFormSchemaValidator } from 'src/services/helpers';
// styles
import styles from './SendCollaborationForm.styled';

function SendCollaborationForm({ collaborationId, handleSubmit }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const isSending = useSelector(selectIsFetchingSentCollaborationToFriend);

  const successCallback = useCallback(() => {
    navigation.goBack();
  }, [navigation.goBack]);

  const onSubmit = useCallback(
    (values) => {
      if (isSending) {
        return;
      }

      const sendPartnershipData = {
        idCollaboration: collaborationId,
        ...values,
      };

      dispatch(
        sendCollaborationToFriendRequest({
          data: sendPartnershipData,
          callback: successCallback,
        }),
      );
    },
    [collaborationId, dispatch, successCallback, isSending],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        Send this partnership to someone who would be perfect a perfect partner.
        Invite them to join HerHeadquarters!
      </Text>
      <Field
        name="firstName"
        component={TextField}
        label="FRIEND’S FIRST NAME"
        formControlStyles={styles.field}
        inputStyle={styles.input}
      />
      <Field
        name="lastName"
        component={TextField}
        label="FRIEND’S LAST NAME"
        formControlStyles={styles.field}
        inputStyle={styles.input}
      />
      <Field
        name="email"
        component={TextField}
        label="FRIEND’S EMAIL"
        formControlStyles={styles.field}
        inputStyle={styles.input}
      />

      <Button
        onPress={handleSubmit(onSubmit)}
        type={'primary'}
        styleButton={styles.button}
      >
        <Spinner isFetching={isSending} color="#ffffff">
          <Text style={styles.buttonText}>Send Partnership</Text>
        </Spinner>
      </Button>
    </View>
  );
}

const validationSchema = yup.object().shape({
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  email: yup.string().required('Required'),
});

const formName = 'sendPartnership';

export default reduxForm({
  form: formName,
  validate: createReduxFormSchemaValidator(validationSchema),
})(SendCollaborationForm);
