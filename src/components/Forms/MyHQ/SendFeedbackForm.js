import React, { useCallback } from 'react';
import { reduxForm, Field } from 'redux-form';
import { View, StyleSheet } from 'react-native';
// core components
import TextField from 'src/components/Fields/TextField';
import SendMessageButton from 'src/components/Buttons/SendMessageButton';
// hooks
import useAlertOnBack from 'src/modules/core/hooks/useAlertOnBack';

const formName = 'sendFeedback';

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 14,
    paddingTop: 14,
    flex: 1,
    paddingBottom: 21,
  },
  button: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: -5,
  },
});

function SendFeedbackForm(props) {
  const { dirty, submit } = props;

  const handleLeave = useCallback(({ forceBack }) => {
    forceBack();
  }, []);

  const handleStay = useCallback(() => {
    submit();
  }, []);

  useAlertOnBack(dirty, {
    title: 'Save changes',
    message: 'Do you want to send your feedback to admin?',
    leaveText: 'Discard',
    handleLeave,
    stayText: 'Save',
    handleStay,
  });

  return (
    <View style={styles.container}>
      <Field
        name={'text'}
        component={TextField}
        inputProps={{
          multiline: true,
          autoFocus: true,
        }}
        contentControlStyles={{
          paddingBottom: 0,
          borderBottomWidth: 0,
        }}
        formControlStyles={{
          marginBottom: 30,
        }}
      />
      <View style={styles.button}>
        <SendMessageButton onPress={() => submit()} />
      </View>
    </View>
  );
}

export default reduxForm({
  form: formName,
})(SendFeedbackForm);
