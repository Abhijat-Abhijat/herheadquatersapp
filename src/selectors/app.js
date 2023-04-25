import { createSelector } from 'reselect';

const AppState = (state) => state.app;

export const getNavigationState = (state) => state.app.navigation;

export const getIsFetchingApp = (state) => state.app.isFetching;

export const getCurrentRoute = createSelector(
  AppState,
  (app) => app.navigation.currentRoute,
);

export const getPreviousTimeStamp = createSelector(
  AppState,
  (app) => app.navigation.previousTimeStamp,
);
