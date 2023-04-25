// service disabled to research setting up apple permissions

// import * as Amplitude from 'expo-analytics-amplitude';
// import config from '../config';
//
// const trackingConfig = {};
//
// const events = {
//   ScreenTime: async (properties) => {
//     if (properties.screen) {
//       await Amplitude.logEventWithPropertiesAsync('Screen Time', properties);
//     }
//   },
//   OpenCollaboration: async (title) => {
//     await Amplitude.logEventWithPropertiesAsync('Open Collaboration', {
//       title,
//     });
//   },
//   SearchResults: async (q, otherProperties) => {
//     const properties = {};
//
//     Object.keys(otherProperties).forEach((key) => {
//       if (otherProperties[key]) {
//         const array = JSON.parse(otherProperties[key]);
//
//         if (array.length) {
//           properties[key] = array;
//         }
//       }
//     });
//
//     await Amplitude.logEventWithPropertiesAsync('Search Request', {
//       q,
//       ...properties,
//     });
//   },
//   OpenCreateCollaboration: async () => {
//     await Amplitude.logEventAsync('Open Create Collaboration');
//   },
//   CollaborationCreated: async () => {
//     await Amplitude.logEventAsync('Collaboration Created');
//   },
// };
//
// const init = async () => {
//   await Amplitude.initializeAsync(config.amplitude);
// };
//
// const initUser = async ({
//   _id,
//   email,
//   companyName,
//   city,
//   state,
//   industry,
//   businessType,
// }) => {
//   await Promise.all([
//     Amplitude.setUserIdAsync(_id),
//     Amplitude.setUserPropertiesAsync({
//       email,
//       companyName,
//       city,
//       state,
//       industry,
//       businessType,
//     }),
//   ]);
// };
//
// const clearUser = async () => {
//   await Amplitude.clearUserPropertiesAsync();
// };
//
// const track = async (eventName, ...properties) => {
//   const event = events[eventName];
//
//   if (!event) {
//     console.error(`Undefined event ${eventName}`);
//   } else {
//     await event(...properties);
//   }
// };
//
// export default {
//   init,
//   initUser,
//   clearUser,
//   track,
//   config: trackingConfig,
// };
