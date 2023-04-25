import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
// core components
import SwitchField from '../../Fields/SwitchField';
import Button from '../../Buttons/Button';

const styles = StyleSheet.create({
  buttonText: {
    color: '#fff',
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
  },
});

export const formName = 'updateNotificationPreferences';

class UpdateNotificationPreferencesForm extends React.PureComponent {
  render() {
    return (
      <View>
        <Field
          name={'messages'}
          component={SwitchField}
          label={'NEW MESSAGES'}
          formControlStyles={{
            marginBottom: 30,
          }}
        />
        <Field
          name={'newRequests'}
          component={SwitchField}
          label={'NEW PARTNERSHIP REQUESTS'}
          formControlStyles={{
            marginBottom: 30,
          }}
        />
        <Field
          name={'changedRequests'}
          component={SwitchField}
          label={'ACCEPTED PARTNERSHIPS'}
          formControlStyles={{
            marginBottom: 30,
          }}
        />
        <Field
          name={'removedCollaboration'}
          component={SwitchField}
          label={'ENDED PARTNERSHIPS'}
          formControlStyles={{
            marginBottom: 35,
          }}
        />
        <Button onPress={() => this.props.submit()}>
          <Text style={styles.buttonText}>{this.props.buttonText}</Text>
        </Button>
      </View>
    );
  }
}

UpdateNotificationPreferencesForm = reduxForm({
  form: formName,
})(UpdateNotificationPreferencesForm);

const mapStateToProps = (state, ownProps) => ({
  initialValues: ownProps.notification,
});

export default connect(mapStateToProps)(UpdateNotificationPreferencesForm);
