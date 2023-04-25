import { Platform } from 'react-native';

const oneCredit = {
  storeId: Platform.select({
    android: 'credit_1',
    ios: 'credit_1',
  }),
  selectLabel: '1 credit',
  selectValue: '1',
  selectPrice: '$5.00',
};

const twoCredits = {
  storeId: Platform.select({
    android: 'credit_2',
    ios: 'credit_2',
  }),
  selectLabel: '2 credits',
  selectValue: '2',
  selectPrice: '$10.00',
};

const threeCredits = {
  storeId: Platform.select({
    android: 'credit_3',
    ios: 'credit_3',
  }),
  selectLabel: '3 credits',
  selectValue: '3',
  selectPrice: '$15.00',
};

export const creditList = [oneCredit, twoCredits, threeCredits];

export const productIdList = creditList.map((credit) => credit.storeId);

export const creditSelectOptionList = creditList.map((credit) => {
  return {
    value: credit.selectValue,
    label: credit.selectLabel,
  };
});
