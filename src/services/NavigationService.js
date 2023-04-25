import { CommonActions, StackActions } from '@react-navigation/native';

let _navigator;
let _appNavigator;

function setAppNavigator(appNavigator) {
  _appNavigator = appNavigator;
}

function getAppNavigator() {
  return _appNavigator;
}

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  if (_navigator) {
    _navigator.dispatch(
      CommonActions.navigate({
        name: routeName,
        params,
      }),
    );
  }
}

function reset(routeName, params = {}, index = 0) {
  if (_navigator) {
    _navigator.dispatch(
      CommonActions.reset({
        index,
        routes: [
          {
            name: routeName,
            params,
          },
        ],
      }),
    );
  }
}

function replace(routeName, params = {}) {
  if (_navigator) {
    _navigator.dispatch(StackActions.replace(routeName, params));
  }
}

export default {
  setTopLevelNavigator,
  setAppNavigator,
  getAppNavigator,
  navigate,
  reset,
  replace,
};
