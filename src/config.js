import Constants from 'expo-constants';

const config = {
  development: {
    url: 'https://api.dev.herheadquarters.app',
    management: 'https://dev.herheadquarters.app/app/account',
    terms: 'https://dev.herheadquarters.app/terms',
    privacy: 'https://dev.herheadquarters.app/privacy',
    webUrl: 'https://dev.herheadquarters.app/',
    limit: 25,
    messagesLimit: 50,
    potentialPartnersLimit: 25,
    toastDuration: 1500,
    amplitude: '7ae0360ff6259bc9ae4ff679fdfe2e2b',
  },
  staging: {
    url: 'https://api.dev.herheadquarters.app',
    management: 'https://dev.herheadquarters.app/app/account',
    terms: 'https://dev.herheadquarters.app/terms',
    privacy: 'https://dev.herheadquarters.app/privacy',
    webUrl: 'https://dev.herheadquarters.app/',
    limit: 25,
    messagesLimit: 50,
    potentialPartnersLimit: 25,
    toastDuration: 1500,
    amplitude: '54a612b58bc56285589b76fb2211afb7',
  },
  production: {
    url: 'https://api.herheadquarters.app',
    management: 'https://herheadquarters.app/app/account',
    terms: 'https://herheadquarters.app/terms',
    privacy: 'https://herheadquarters.app/privacy',
    webUrl: 'https://herheadquarters.app/',
    limit: 25,
    messagesLimit: 50,
    potentialPartnersLimit: 25,
    toastDuration: 1500,
    amplitude: 'f31ccef69a5cd38156bb106673e42ce2',
  },
};

export default config.production;
//export default config[Constants.manifest.releaseChannel] || config.development;
