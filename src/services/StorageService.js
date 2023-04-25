import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GET_COLLABORATIONS_REQUEST,
  GET_COLLABORATIONS_REFRESH_REQUEST,
  GET_COLLABORATIONS_MORE_REQUEST,
} from '../actions/types';
import {
  arrayToHashTable,
  refreshList,
  hashTableToArray,
} from '../actions/utils';

const storageKeys = {
  collaborationsList: 'collaborationsList',
  profile: 'profile',
  jwt_token: 'jwt_token',
  assets: 'assets',
};

const collaborationsListTypes = {
  [GET_COLLABORATIONS_REQUEST]: async (list) => {
    const hashedList = arrayToHashTable(list);

    await AsyncStorage.setItem(
      storageKeys.collaborationsList,
      JSON.stringify(hashedList),
    );
  },
  [GET_COLLABORATIONS_REFRESH_REQUEST]: async (list) => {
    const oldList = await AsyncStorage.getItem(storageKeys.collaborationsList);
    const newList = refreshList(JSON.parse(oldList), list);

    await AsyncStorage.setItem(
      storageKeys.collaborationsList,
      JSON.stringify(newList),
    );
  },
  [GET_COLLABORATIONS_MORE_REQUEST]: async (list) => {
    const oldList = await AsyncStorage.getItem(storageKeys.collaborationsList);
    const newList = {
      ...JSON.parse(oldList),
      ...arrayToHashTable(list),
    };

    await AsyncStorage.setItem(
      storageKeys.collaborationsList,
      JSON.stringify(newList),
    );
  },
};

export const Collaboration = {
  setCollaborationsList: async (list, type) => {
    const action = collaborationsListTypes[type];

    if (!action) {
      return null;
    }

    return await action(list);
  },
  getCollaborationsList: async () => {
    const hashedList = await AsyncStorage.getItem(
      storageKeys.collaborationsList,
    );

    return hashedList ? hashTableToArray(JSON.parse(hashedList)) : [];
  },
  clearCollaborationsList: async () => {
    await AsyncStorage.removeItem(storageKeys.collaborationsList);
  },
};

export const User = {
  setProfile: async (profile) => {
    await AsyncStorage.setItem(storageKeys.profile, JSON.stringify(profile));
  },
  getProfile: async () => {
    const profileRaw = await AsyncStorage.getItem(storageKeys.profile);

    if (profileRaw) {
      return JSON.parse(profileRaw);
    } else {
      return null;
    }
  },
  clearProfile: async () => {
    await AsyncStorage.removeItem(storageKeys.profile);
  },
};

export const Auth = {
  setToken: async (token) => {
    await AsyncStorage.setItem(storageKeys.jwt_token, token);
  },
  getToken: async () => {
    return await AsyncStorage.getItem(storageKeys.jwt_token);
  },
  clearToken: async () => {
    await AsyncStorage.removeItem(storageKeys.jwt_token);
  },
};

export const Asset = {
  setAsset: async (id, payload) => {
    let cachedAssets = await AsyncStorage.getItem(storageKeys.assets);

    if (!cachedAssets) {
      cachedAssets = {};

      await AsyncStorage.setItem(
        storageKeys.assets,
        JSON.stringify(cachedAssets),
      );
    } else {
      cachedAssets = JSON.parse(cachedAssets);
    }

    cachedAssets[id] = payload;

    await AsyncStorage.setItem(
      storageKeys.assets,
      JSON.stringify(cachedAssets),
    );
  },
  getAsset: async (id) => {
    let cachedAssets = await AsyncStorage.getItem(storageKeys.assets);

    if (!cachedAssets) {
      await AsyncStorage.setItem(storageKeys.assets, JSON.stringify({}));
    } else {
      cachedAssets = JSON.parse(cachedAssets);
    }

    return cachedAssets[id];
  },
  clearAssets: async () => {
    await AsyncStorage.setItem(storageKeys.assets, JSON.stringify({}));
  },
};
