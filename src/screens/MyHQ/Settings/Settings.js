import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet } from 'react-native';
// core components
import SettingsRow from '../../../components/User/SettingsRow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Settings extends React.Component {
  clickChangePassword = () => {
    this.props.navigation.navigate('ChangePassword');
  };

  clickUpdateNotification = () => {
    this.props.navigation.navigate('UpdateNotificationPreferences');
  };

  clickUpdateEmail = () => {
    this.props.navigation.navigate('UpdateEmailPreferences');
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <SettingsRow
          label="Change Password"
          action={this.clickChangePassword}
          iconName="ios-lock"
        />
        <SettingsRow
          label="Update Notification Preferences"
          action={this.clickUpdateNotification}
          iconName="ios-create"
        />
        <SettingsRow
          label="Update Email Preferences"
          action={this.clickUpdateEmail}
          iconName="ios-briefcase"
        />
      </ScrollView>
    );
  }
}

export const screenOptions = {
  title: 'My HQ',
};

export default connect()(Settings);
