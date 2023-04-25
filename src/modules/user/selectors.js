import { createSelector } from 'reselect';
// utils
import { hashTableToArray, getShortState } from '../../actions/utils';

export const selectPotentialPartnersList = (state) =>
  hashTableToArray(state.potentialPartners.list);

export const selectPotentialPartnersLoading = (state) =>
  state.potentialPartners.isFetching;

export const selectPotentialPartnersPagination = (state) =>
  state.potentialPartners.pagination;

export const selectPotentialPartner = (state, id) =>
  state.potentialPartners.list[id];

export const selectPotentialPartnerFullName = createSelector(
  selectPotentialPartner,
  (profile) => (profile ? `${profile.firstName} ${profile.lastName}` : ''),
);

export const selectPotentialPartnerAddress = createSelector(
  selectPotentialPartner,
  (profile) => {
    if (!profile) {
      return;
    }

    let address = `${profile.city}`;

    if (profile.state) {
      address += ', ' + getShortState(profile.state);
    }

    return address;
  },
);

export const selectPotentialPartnerAvatar = createSelector(
  selectPotentialPartner,
  (profile) => {
    if (!profile) {
      return {
        src: '',
      };
    }

    if (!profile.avatar) {
      return {
        src: '',
      };
    }

    return profile.avatar;
  },
);

export const selectUserAccountPlan = (state) => {
  return state.user.profile?.plan;
};

export const selectUserCredits = (state) => {
  if (state.user.profile?.credits) {
    const extra = state.user.profile.credits?.extra || 0;
    const subscription = state.user.profile.credits?.subscription || 0;

    return extra + subscription;
  }

  return -1;
};
