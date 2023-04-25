import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet } from 'react-native';
// core components
import ChangePasswordForm from '../../../components/Forms/MyHQ/ChangePasswordForm';
// actions
import { changePasswordRequest } from '../../../actions/user';
import { getIsFetchingUser } from '../../../selectors/user';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

class ChangePassword extends React.PureComponent {
  handleSubmit = (values) => {
    this.props.dispatch(changePasswordRequest(values));
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <ChangePasswordForm
          onSubmit={this.handleSubmit}
          isFetching={this.props.isFetching}
        />
      </ScrollView>
    );
  }
}

export const screenOptions = {
  title: 'Change Password',
};

const mapStateToProps = (state) => ({
  isFetching: getIsFetchingUser(state).changePassword,
});

export default connect(mapStateToProps)(ChangePassword);
