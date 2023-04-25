import { Platform, Alert } from 'react-native';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
import mime from 'mime-types';
import * as FileSystem from 'expo-file-system';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { Buffer } from 'buffer';
// enums
import {
  imageTypes,
  videoTypes,
  androidVideoTypes,
} from 'src/components/Fields/enums';

export const isPhoto = (mimeType) => imageTypes.includes(mimeType);

export const isVideo = (mimeType) => {
  if (Platform.OS === 'android') {
    return androidVideoTypes.includes(mimeType);
  } else {
    return videoTypes.includes(mimeType);
  }
};

export const getFileDisplayType = (mimeType) => {
  if (isPhoto(mimeType)) {
    return 'Photo';
  } else if (isVideo(mimeType)) {
    return 'Video';
  } else {
    return 'File';
  }
};

export const generateThumbnail = async (source) => {
  return await VideoThumbnails.getThumbnailAsync(source, {
    compress: 1,
    time: 1000,
  });
};

export const compose = (...funcs) =>
  funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args)),
    (arg) => arg,
  );

export const generateId = () => nanoid(30);

export const getAssetInfo = async (uri) => {
  const mimeType = mime.lookup(uri);
  const filename = uri.substring(uri.lastIndexOf('/') + 1);
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  const buffer = Buffer.from(base64, 'base64');

  return {
    mimeType,
    filename,
    buffer,
  };
};

const socials = ['facebook', 'instagram', 'twitter'];

export const stringifySocialLinks = (socialLinks) => {
  if (socialLinks) {
    socials.forEach((socialName) => {
      if (socialLinks[socialName]) {
        socialLinks[
          socialName
        ] = `https://${socialName}.com/${socialLinks[socialName]}`;
      } else {
        delete socialLinks[socialName];
      }
    });
  }

  return socialLinks;
};

export const parseSocialLinks = (socialLinks) => {
  if (socialLinks) {
    socials.forEach((socialName) => {
      socialLinks[socialName] = socialLinks[socialName]
        ? socialLinks[socialName].substring(
            `https://${socialName}.com/`.length,
            socialLinks[socialName].length,
          )
        : null;
    });
  }

  return socialLinks;
};

export function splitArr(arr, divider) {
  const newArr = [];

  let tempArr = [];
  for (let i = 0; i < arr.length; i++) {
    tempArr.push(arr[i]);

    if ((i + 1) % divider === 0) {
      newArr.push(tempArr);
      tempArr = [];
    }
  }

  if (tempArr.length > 0) {
    newArr.push(tempArr);
  }

  return newArr;
}

export function assembleArr(arr1, arr2) {
  let newArr = [];
  const maxLength = arr1.length > arr2.length ? arr1.length : arr2.length;

  for (let i = 0; i < maxLength; i++) {
    if (arr1[i]) {
      newArr = newArr.concat(arr1[i]);
    }

    if (arr2[i]) {
      newArr = newArr.concat(arr2[i]);
    }
  }

  return newArr;
}

export const createReduxFormSchemaValidator = (validationSchema) => {
  return (values) => {
    try {
      validationSchema.validateSync(values, { abortEarly: false });
      return {};
    } catch (errors) {
      return errors.inner.reduce((errors, error) => {
        return {
          ...errors,
          [error.path]: error.message,
        };
      }, {});
    }
  };
};

export const showLeaveAlert = ({
  title = 'Leave the page',
  message = 'Are you sure you want to leave the page?',
  stayText = 'Stay',
  leaveText = 'Leave',
  onStay = () => {},
  onLeave = () => {},
}) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: leaveText,
        style: 'cancel',
        onPress: onLeave,
      },
      {
        text: stayText,
        onPress: onStay,
      },
    ],
    { cancelable: true },
  );
};
