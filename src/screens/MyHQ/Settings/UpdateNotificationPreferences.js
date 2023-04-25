import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet } from 'react-native';
// core components
import Spinner from '../../../components/Spinner';
import UpdateNotificationPreferencesForm from '../../../components/Forms/MyHQ/UpdateNotificationPreferencesForm';
// actions
import { updateProfileRequest } from '../../../actions/user';
import {
  getIsFetchingUpdateProfile,
  getProfile,
} from '../../../selectors/user';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

class UpdateEmailPreferences extends React.PureComponent {
  static propTypes = {
    isFetching: PropTypes.bool,
    profile: PropTypes.object,
  };

  handleSubmit = (values) => {
    const { profile } = this.props;

    this.props.dispatch(
      updateProfileRequest({
        profile: {
          ...profile,
          notification: {
            ...profile.notification,
            push: values,
          },
        },
        avatar: profile.avatar,
        portfolio: profile.portfolio,
      }),
    );
  };

  render() {
    const { isFetching, profile } = this.props;

    return (
      <Spinner isFetching={isFetching} onCenter>
        <ScrollView contentContainerStyle={styles.container}>
          <UpdateNotificationPreferencesForm
            onSubmit={this.handleSubmit}
            notification={profile.notification.push}
            buttonText={'Save Notification Preferences'}
          />
        </ScrollView>
      </Spinner>
    );
  }
}

export const screenOptions = {
  title: 'Update Notification Preferences',
};

const mapStateToProps = (state) => ({
  profile: getProfile(state),
  isFetching: getIsFetchingUpdateProfile(state),
});

export default connect(mapStateToProps)(UpdateEmailPreferences);
