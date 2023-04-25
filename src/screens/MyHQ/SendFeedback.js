import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
// components
import Spinner from 'src/components/Spinner';
import SendFeedbackForm from 'src/components/Forms/MyHQ/SendFeedbackForm';
// actions
import { sendFeedbackRequest } from 'src/actions/app';
// selectors
import { getIsFetchingApp } from 'src/selectors/app';
// styles
import { paleGrey } from 'src/assets/jss/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 11,
    paddingBottom: 23,
    paddingLeft: 20,
    paddingRight: 14,
    borderBottomColor: paleGrey,
    borderBottomWidth: 1,
  },
  headerText: {
    lineHeight: 18,
    letterSpacing: 0,
  },
  spinnerContainer: {
    height: 60,
    justifyContent: 'center',
  },
});

function SendFeedback() {
  const dispatch = useDispatch();

  const isFetching = useSelector(
    (state) => getIsFetchingApp(state).sendFeedback,
  );

  const handleSubmit = useCallback(
    (values) => {
      dispatch(sendFeedbackRequest(values.text));
    },
    [dispatch],
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Spinner
        isFetching={isFetching}
        containerStyle={styles.spinnerContainer}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Let us know what you like about HerHeadquarters or what we can do to
          make it better for you.
        </Text>
      </View>
      <SendFeedbackForm onSubmit={handleSubmit} />
    </ScrollView>
  );
}

export const screenOptions = {
  title: 'Send Feedback',
};

export default SendFeedback;
