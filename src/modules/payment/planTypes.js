import { Platform } from 'react-native';

export const premiumPlus = {
  name: 'premium_plus_39.99',
  storeId: Platform.select({
    android: 'premium_plus_39.99',
    ios: 'premium_plus_39.99',
  }),
  title: 'Premium Plus',
  alias: 'The Power Player',
  priceText: '$39.99/month',
  image: require('root/assets/plans/premiumPlus.png'),
  advantages: [
    {
      text: 'Create unlimited partnership posts',
      active: true,
    },
    {
      text: 'Discover your brand partnership matches with women-owned businesses',
      active: true,
    },
    {
      text: '10 Connection Credits per month',
      active: true,
    },
    {
      text: 'Access potential partner’s rating & partnership history',
      active: true,
    },
    {
      text: 'Access MasterClass sessions exclusive to our women founder community',
      active: true,
    },
    {
      text: 'Priority display of your personal profile & all partnership postings',
      active: true,
    },
    {
      text: 'Verified badge on your profile',
      active: true,
    },
  ],
};

export const premium = {
  name: 'premium_19.99',
  storeId: Platform.select({
    android: 'premium_19.99',
    ios: 'premium_19.99',
  }),
  title: 'Premium',
  alias: 'The Mini Mogul',
  priceText: '$19.99/month',
  image: require('root/assets/plans/premium.png'),
  advantages: [
    {
      text: 'Create unlimited partnership posts',
      active: true,
    },
    {
      text: 'Discover your brand partnership matches with women-owned businesses',
      active: true,
    },
    {
      text: '5 Connection Credits per month',
      active: true,
    },
    {
      text: 'Access potential partner’s rating & partnership history',
      active: true,
    },
    {
      text: 'Access MasterClass sessions exclusive to our women founder community',
      active: true,
    },
  ],
};

export const basic = {
  name: 'basic_new',
  title: 'Basic',
  alias: 'The Entrepreneur',
  priceText: '$5.00/credit',
  image: require('root/assets/plans/basic.png'),
  advantages: [
    {
      text: 'Create unlimited partnership posts',
      active: true,
    },
    {
      text: 'Credit purchase per connection',
      active: true,
    },
    {
      text: '5 Connection Credits per month',
      active: false,
    },
    {
      text: 'Access potential partner’s rating & partnership history',
      active: false,
    },
  ],
};

export const oldPremium = {
  name: 'basic',
  title: 'Premium (Stripe)',
};

export const allPlanList = [oldPremium, basic, premium, premiumPlus];

const storePlanList = [premium, premiumPlus];

export const storePlanIdList = storePlanList.map((acc) => acc.storeId);
