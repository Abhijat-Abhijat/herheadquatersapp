import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from "react-redux";
import { Platform } from "react-native";
import { setCustomText } from "react-native-global-props";
import { PERMISSIONS, request } from "react-native-permissions";
// expo
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import * as Permissions from "expo-permissions";

// containers
import ErrorBoundary from "src/modules/core/containers/ErrorBoundary";
// components
import Layout from "src/components/Layout";
// styles
import { blackColor } from "src/assets/jss/styles";
// store
import store from "src/store";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    isSplashReady: false,
    isAppReady: false,
  };

  defaultTextFont = {
    style: {
      fontSize: 13,
      fontFamily: "lato-regular",
      color: blackColor,
    },
  };

  async componentDidMount() {
    if (Platform.OS === "ios") {
      request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
    }

    try {
      await SplashScreen.preventAutoHideAsync();
      await this.cacheResources();
    } catch (err) {
      console.warn(err);
    }
  }

  cacheResources = async () => {
    const images = [
      require("./assets/emptyAvatar.png"),
      require("./assets/logo/hh.png"),
      require("./assets/Onboarding/Onboarding1/Onboarding1.png"),
      require("./assets/Onboarding/Onboarding2/Onboarding2.png"),
      require("./assets/Onboarding/Onboarding3/Onboarding3.png"),
      require("./assets/Onboarding/Onboarding4/Onboarding4.png"),
    ];

    const imagePromises = images.map((image) =>
      Asset.fromModule(image).downloadAsync()
    );

    await Promise.all([...imagePromises, this.downloadFonts()]);

    setCustomText(this.defaultTextFont);

    this.setState({ isAppReady: true }, async () => {
      await SplashScreen.hideAsync();
    });
  };

  downloadFonts = async () => {
    await Font.loadAsync({
      "lato-regular": require("./assets/fonts/Lato-Regular.ttf"),
      "lato-bold": require("./assets/fonts/Lato-Bold.ttf"),
      "lato-italic": require("./assets/fonts/Lato-Italic.ttf"),
      "open-sans-regular": require("./assets/fonts/OpenSans-Regular.ttf"),
      "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
      "herheadquarters-icons": require("./assets/fonts/HerHeadquarters-Icons.ttf"),
    });
  };

  render() {
    if (!this.state.isAppReady) {
      return null;
    }

    return (
      <ErrorBoundary>
        <Provider store={store}>
          <Layout />
        </Provider>
      </ErrorBoundary>
    );
  }
}

export default App;