import { Linking } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import moment from 'moment';
import { put } from 'redux-saga/effects';
import ToastService from '../services/ToastService';
import NavigationService from '../services/NavigationService';

export function* proceedError(errorAction, error, notification = true) {
  if (typeof errorAction === 'string') {
    error = errorAction;

    if (notification) {
      ToastService.showToast(error, 'danger');
    }
  } else if (typeof error === 'string') {
    yield put(errorAction(error));

    if (notification) {
      ToastService.showToast(error, 'danger');
    }
  } else if (error instanceof Error) {
    const errorMsg = error.response
      ? error.response.data.error || error.response.statusText
      : error.message;

    yield put(errorAction(errorMsg));

    if (notification) {
      ToastService.showToast(errorMsg, 'danger');
    }

    if (errorMsg === 'Session expired') {
      NavigationService.navigate('Auth');
    }
  }
}

export const formatToDateString = (time) => {
  return moment(time).format('MMM D');
};

export const formatToTimeString = (time) => {
  return moment(time).format('h:mm a');
};

export const isDiffInOneDay = (time1, time2) => {
  const firstDay = moment(time1).date();
  const secondDay = moment(time2).date();

  return firstDay !== secondDay;
};

export const formatCollaborationDateToFull = (time) => {
  if (!time) {
    return '';
  }

  return moment(time).format('MMMM D, YYYY');
};

export const arrayToHashTable = (arr) => {
  return arr.reduce((acc, item) => {
    if (typeof item === 'string') {
      acc[item] = {};
    } else {
      acc[item._id] = item;
    }

    return acc;
  }, {});
};

export const hashTableToArray = (hashTable) => {
  return Object.values(hashTable);
};

export const refreshList = (stateList, payloadList) => {
  const list = hashTableToArray(stateList);

  const newItems = payloadList.reduce((acc, item) => {
    if (list.findIndex((payload) => payload._id === item._id) === -1) {
      acc[item._id] = item;
    }

    return acc;
  }, {});

  const toUpdate = list.reduce((acc, item) => {
    if (payloadList.findIndex((payload) => payload._id === item._id) !== -1) {
      acc[item._id] = item;
    }

    return acc;
  }, {});

  return {
    ...newItems,
    ...toUpdate,
    ...arrayToHashTable(payloadList),
  };
};

export const removeItems = (list, ids) => {
  const copy = { ...list };

  if (Array.isArray(ids)) {
    ids.forEach((id) => {
      delete copy[id];
    });
  } else {
    delete copy[ids];
  }

  return copy;
};

const states = [
  {
    name: 'Alabama',
    abbreviation: 'AL',
  },
  {
    name: 'Alaska',
    abbreviation: 'AK',
  },
  {
    name: 'American Samoa',
    abbreviation: 'AS',
  },
  {
    name: 'Arizona',
    abbreviation: 'AZ',
  },
  {
    name: 'Arkansas',
    abbreviation: 'AR',
  },
  {
    name: 'California',
    abbreviation: 'CA',
  },
  {
    name: 'Colorado',
    abbreviation: 'CO',
  },
  {
    name: 'Connecticut',
    abbreviation: 'CT',
  },
  {
    name: 'Delaware',
    abbreviation: 'DE',
  },
  {
    name: 'District Of Columbia',
    abbreviation: 'DC',
  },
  {
    name: 'Federated States Of Micronesia',
    abbreviation: 'FM',
  },
  {
    name: 'Florida',
    abbreviation: 'FL',
  },
  {
    name: 'Georgia',
    abbreviation: 'GA',
  },
  {
    name: 'Guam',
    abbreviation: 'GU',
  },
  {
    name: 'Hawaii',
    abbreviation: 'HI',
  },
  {
    name: 'Idaho',
    abbreviation: 'ID',
  },
  {
    name: 'Illinois',
    abbreviation: 'IL',
  },
  {
    name: 'Indiana',
    abbreviation: 'IN',
  },
  {
    name: 'Iowa',
    abbreviation: 'IA',
  },
  {
    name: 'Kansas',
    abbreviation: 'KS',
  },
  {
    name: 'Kentucky',
    abbreviation: 'KY',
  },
  {
    name: 'Louisiana',
    abbreviation: 'LA',
  },
  {
    name: 'Maine',
    abbreviation: 'ME',
  },
  {
    name: 'Marshall Islands',
    abbreviation: 'MH',
  },
  {
    name: 'Maryland',
    abbreviation: 'MD',
  },
  {
    name: 'Massachusetts',
    abbreviation: 'MA',
  },
  {
    name: 'Michigan',
    abbreviation: 'MI',
  },
  {
    name: 'Minnesota',
    abbreviation: 'MN',
  },
  {
    name: 'Mississippi',
    abbreviation: 'MS',
  },
  {
    name: 'Missouri',
    abbreviation: 'MO',
  },
  {
    name: 'Montana',
    abbreviation: 'MT',
  },
  {
    name: 'Nebraska',
    abbreviation: 'NE',
  },
  {
    name: 'Nevada',
    abbreviation: 'NV',
  },
  {
    name: 'New Hampshire',
    abbreviation: 'NH',
  },
  {
    name: 'New Jersey',
    abbreviation: 'NJ',
  },
  {
    name: 'New Mexico',
    abbreviation: 'NM',
  },
  {
    name: 'New York',
    abbreviation: 'NY',
  },
  {
    name: 'North Carolina',
    abbreviation: 'NC',
  },
  {
    name: 'North Dakota',
    abbreviation: 'ND',
  },
  {
    name: 'Northern Mariana Islands',
    abbreviation: 'MP',
  },
  {
    name: 'Ohio',
    abbreviation: 'OH',
  },
  {
    name: 'Oklahoma',
    abbreviation: 'OK',
  },
  {
    name: 'Oregon',
    abbreviation: 'OR',
  },
  {
    name: 'Palau',
    abbreviation: 'PW',
  },
  {
    name: 'Pennsylvania',
    abbreviation: 'PA',
  },
  {
    name: 'Puerto Rico',
    abbreviation: 'PR',
  },
  {
    name: 'Rhode Island',
    abbreviation: 'RI',
  },
  {
    name: 'South Carolina',
    abbreviation: 'SC',
  },
  {
    name: 'South Dakota',
    abbreviation: 'SD',
  },
  {
    name: 'Tennessee',
    abbreviation: 'TN',
  },
  {
    name: 'Texas',
    abbreviation: 'TX',
  },
  {
    name: 'Utah',
    abbreviation: 'UT',
  },
  {
    name: 'Vermont',
    abbreviation: 'VT',
  },
  {
    name: 'Virgin Islands',
    abbreviation: 'VI',
  },
  {
    name: 'Virginia',
    abbreviation: 'VA',
  },
  {
    name: 'Washington',
    abbreviation: 'WA',
  },
  {
    name: 'West Virginia',
    abbreviation: 'WV',
  },
  {
    name: 'Wisconsin',
    abbreviation: 'WI',
  },
  {
    name: 'Wyoming',
    abbreviation: 'WY',
  },
];

export const getShortState = (state) => {
  const stateInfo = states.find((stat) => stat.name === state);

  if (!stateInfo) {
    return state;
  }

  return stateInfo.abbreviation;
};

export const getCollaborationTimeStarted = (time, prefix = '') => {
  if (!prefix) {
    if (moment(time).diff(moment(), 'days') <= 0) {
      prefix = 'Started ';
    } else {
      prefix = 'Starts ';
    }
  }

  return prefix + moment(time).fromNow();
};

export const getCriteriaKeys = (rating) =>
  Object.keys(rating).filter((criteria) => criteria !== 'total');

export const criteriasMap = {
  communication: 'Communication',
  deadlinesMet: 'Deadlines Met',
  brandValue: 'Brand Value',
  fulfilledObligations: 'Fulfilled Obligations',
  overallExperience: 'Overall Experience',
};

export const openLink = async (url) => {
  try {
    if (!url.includes('http')) {
      url = 'http://' + url;
    }

    await WebBrowser.openBrowserAsync(url);
  } catch (e) {}
};

export const msToSec = (ms) => {
  return Math.round(ms / 1000);
};

export const msToMin = (ms) => {
  return Math.round(ms / 60000);
};
