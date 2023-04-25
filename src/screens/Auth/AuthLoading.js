import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
// components
import Spinner from 'src/components/Spinner';
// actions
import { authInitialProfileRequest } from 'src/actions/user';
// styles
import { appBackgroundColor } from 'src/assets/jss/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: appBackgroundColor,
  },
});

class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    this.props.dispatch(authInitialProfileRequest());
  };

  render() {
    return (
      <View style={styles.container}>
        <Spinner isFetching={true} onCenter />
      </View>
    );
  }
}

export default connect()(AuthLoading);
