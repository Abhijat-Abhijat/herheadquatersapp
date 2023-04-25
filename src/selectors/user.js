import { createSelector } from 'reselect';
import { hashTableToArray } from '../actions/utils';

export const getProfile = (state) => state.user.profile;

export const getIsFetchingProfile = (state) => state.user.isFetching.profile;

export const getIsFetchingUpdateProfile = (state) =>
  state.user.isFetching.updateProfile;

export const getIsFetchingSignin = (state) => state.user.isFetching.signin;

export const getIsFetchingSignup = (state) => state.user.isFetching.signup;

export const getIsFetchingSignout = (state) => state.user.isFetching.signout;

export const getIsFetchingUser = (state) => state.user.isFetching;

export const getCurrentUser = (state) => {
  if (state.user && state.user.user) {
    return state.user.user;
  }

  // quickfix to prevent HH-322 (possible race condition?)
  return {
    _id: undefined,
    firstName: '',
    lastName: '',
  };
};

export const getFavorites = createSelector(getProfile, (profile) => ({
  profiles: hashTableToArray(profile.favorites.profiles),
  collaborations: hashTableToArray(profile.favorites.collaborations),
  hashProfiles: profile.favorites.profiles,
  hashCollaborations: profile.favorites.collaborations,
}));

const getPassedIdCollaboration = (state, idCollaboration) => idCollaboration;
const getPassedIdUser = (state, idUser) => idUser;

export const isCollaborationFavorite = createSelector(
  [getFavorites, getPassedIdCollaboration],
  (favorites, idCollaboration) => {
    return !!favorites.hashCollaborations[idCollaboration];
  },
);

export const isProfileFavorite = createSelector(
  [getFavorites, getPassedIdUser],
  (favorites, idUser) => {
    return !!favorites.hashProfiles[idUser];
  },
);

export const getListUsers = (state) => hashTableToArray(state.user.list);
export const getPaginationUser = (state) => state.user.pagination;

export const getMyId = createSelector(getProfile, (profile) => profile._id);

export const selectAvatar = createSelector(
  getProfile,
  (profile) => profile.avatar,
);
export const selectAboutCompany = createSelector(
  getProfile,
  (profile) => profile.aboutCompany,
);
export const selectQuiz = createSelector(getProfile, (profile) => profile.quiz);

export const selectUserAcountSubscriptionProvider = createSelector(
  getProfile,
  (profile) => profile.subscriptionProvider,
);
