import "react-native-reanimated";
import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
// import * as Permissions from "expo-permissions";
import { AppRegistry } from "react-native";


import App from "./App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
AppRegistry.registerComponent("App", () => App);
// registerRootComponent(App);
