import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, AppState, Platform } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import * as Notifications from 'expo-notifications';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as IAP from 'expo-in-app-purchases';
// core components
import Navigator from 'src/routers/Navigator';
// actions
import SocketService from 'src/services/SocketService';
import {
  inAppPurchaseConnectionRequest,
  handlePurchasePaymentRequest,
} from 'src/modules/payment/payment.actions';

const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

class Layout extends React.PureComponent {
  static propTypes = {
    toast: PropTypes.shape({
      message: PropTypes.string,
      props: PropTypes.object,
      type: PropTypes.oneOf(['success', 'danger', 'info']),
    }),
  };

  handleAppStateChange = async (nextAppState) => {
    if (nextAppState === 'active') {
      await Notifications.setBadgeCountAsync(0);
    }
  };

  async componentDidMount() {
    SocketService.initDispatch(this.props.dispatch);
    SocketService.initClient();
    AppState.addEventListener('change', this.handleAppStateChange);

    const dispatch = this.props.dispatch;

    const setIAPListener = () => {
      IAP.setPurchaseListener((response) => {
        dispatch(handlePurchasePaymentRequest(response));
      });
    };

    dispatch(inAppPurchaseConnectionRequest(setIAPListener));
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    IAP.disconnectAsync();
  }

  render() {
    return (
      <SafeAreaProvider>
        <RootSiblingParent>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior={behavior} enabled>
            <Navigator />
          </KeyboardAvoidingView>
        </RootSiblingParent>
      </SafeAreaProvider>
    );
  }
}

export default connect()(Layout);
