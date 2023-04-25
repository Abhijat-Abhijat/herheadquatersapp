import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, Alert, RefreshControl } from 'react-native';
// core components
import Spinner from 'src/components/Spinner';
import SettingsRow from 'src/components/User/SettingsRow';
// actions
import { signoutRequest, getProfileRequest } from 'src/actions/user';
// selectors
import {
  getIsFetchingSignout,
  getMyId,
  getIsFetchingProfile,
  selectUserAcountSubscriptionProvider,
} from 'src/selectors/user';
import { selectUserCredits } from 'src/modules/user/selectors';
// services
import { Auth } from 'src/services/StorageService';
// utils
import { openLink } from 'src/actions/utils';
import config from 'src/config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class MyHQ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jwt_token: '',
    };

    this.getJwtToken();
  }

  getJwtToken = async () => {
    const jwt_token = await Auth.getToken();
    this.setState(() => ({
      jwt_token,
    }));
  };

  componentDidMount() {
    this.fetchProfile();
  }

  onRefresh = () => {
    this.fetchProfile();
  };

  fetchProfile = () => {
    this.props.dispatch(getProfileRequest());
  };

  clickCredits = () => {
    this.props.navigation.navigate('PurchaseCredits');
  };

  clickSettings = () => {
    this.props.navigation.navigate('Settings');
  };

  clickViewProfile = () => {
    const { _id } = this.props;
    this.props.navigation.navigate('Profile', {
      idUser: _id,
    });
  };

  clickViewPreferences = () => {
    this.props.navigation.navigate('CollaborationPreferences', {
      title: 'Partnership Preferences',
    });
  };

  handleAccountPlanEdit = () => {
    if (this.props.subscriptionProvider === 'stripe') {
      const { jwt_token } = this.state;

      openLink(config.management + `?jwt_token=${jwt_token}`);
    } else {
      this.props.navigation.navigate('AccountPlanEdit');
    }
  };

  clickFeedback = () => {
    this.props.navigation.navigate('SendFeedback');
  };

  clickAbout = () => {
    this.props.navigation.navigate('About');
  };

  signOut = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this.props.dispatch(signoutRequest) },
      ],
      { cancelable: false },
    );
  };

  render() {
    const { isFetching, isProfileFetching, credits } = this.props;

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={isProfileFetching}
            onRefresh={this.onRefresh}
          />
        }
      >
        <Spinner isFetching={isFetching} onCenter>
          <SettingsRow
            label={`Partnership Credits: ${credits}`}
            action={this.clickCredits}
            iconName="ios-pricetag"
          />
          <SettingsRow
            label="Settings"
            action={this.clickSettings}
            iconName="ios-settings"
          />
          <SettingsRow
            label="View/Edit Profile"
            action={this.clickViewProfile}
            iconName="ios-create"
          />
          <SettingsRow
            label="View/Edit Partnership Preferences"
            action={this.clickViewPreferences}
            iconName="ios-create"
          />
          {/* for payments testing */}
          {/* {Constants.manifest.releaseChannel !== 'production' && (
            <SettingsRow
              label="CHANGE PAYMENT HOST"
              action={() => this.props.navigation.navigate('ChangePaymentHost')}
            />
          )} */}
          <SettingsRow
            label="Manage Membership"
            action={this.handleAccountPlanEdit}
            iconName="ios-briefcase"
          />
          <SettingsRow
            label="Send Feedback"
            action={this.clickFeedback}
            iconName="ios-mail"
          />
          <SettingsRow
            label="About"
            action={this.clickAbout}
            iconName="ios-information-circle"
          />
          <SettingsRow
            label="Log Out"
            action={this.signOut}
            iconName="ios-log-out"
          />
        </Spinner>
      </ScrollView>
    );
  }
}

export const screenOptions = {
  title: 'My HQ',
};

const mapStateToProps = (state) => ({
  isFetching: getIsFetchingSignout(state),
  isProfileFetching: getIsFetchingProfile(state),
  _id: getMyId(state),
  credits: selectUserCredits(state),
  subscriptionProvider: selectUserAcountSubscriptionProvider(state),
});

export default connect(mapStateToProps)(MyHQ);
