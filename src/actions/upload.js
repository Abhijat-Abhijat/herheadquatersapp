import { call, put } from 'redux-saga/effects';
import * as types from './types';
import axios from '../axios';
import { proceedError } from './utils';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import mime from 'mime-types';
import { Buffer } from 'buffer';
import { attachmentType } from '../components/Fields/enums';
import { generateMessagePayload, sendMessageRequest } from './message';
import { receiveMessage } from './helpers';
import { generateId, getAssetInfo } from '../services/helpers';

const askCameraRollPermission = async () => {
  // get image from user's library
  const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();

  if (status !== 'granted') {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert(
        '"HerHeadquarters" need access to your photos for setting featured photo on partnerships and profile photo',
      );

      return false;
    }
  }

  return true;
};

const askCameraPermission = async () => {
  const { status } = await ImagePicker.getCameraPermissionsAsync();

  if (status !== 'granted') {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      alert(
        '"HerHeadquarters" need access to your camera for setting featured photo on partnerships and profile photo',
      );

      return false;
    }
  }

  return true;
};

export const uploadImageRequest = (action, type = 'library') => ({
  type: types.UPLOAD_IMAGE_REQUEST,
  payload: {
    action,
    type,
  },
});

const uploadImageSuccess = (image) => ({
  type: types.UPLOAD_IMAGE_SUCCESS,
  payload: {
    image,
  },
});

const uploadImageFailure = (error) => ({
  type: types.UPLOAD_IMAGE_FAILURE,
  error,
});

export function* uploadImage(action) {
  try {
    const isHaveCameraRollPermission = yield call(askCameraRollPermission);

    if (!isHaveCameraRollPermission) {
      return;
    }

    let result;

    if (action.payload.type === 'camera') {
      const isHaveCameraPermission = yield call(askCameraPermission);

      if (!isHaveCameraPermission) {
        return;
      }

      result = yield call(ImagePicker.launchCameraAsync, {
        allowsEditing: true,
        mediaTypes: 'Images',
        base64: true,
      });
    } else {
      result = yield call(ImagePicker.launchImageLibraryAsync, {
        allowsEditing: true,
        mediaTypes: 'Images',
        base64: true,
      });
    }

    if (result.cancelled) {
      return;
    }

    let image;

    if (result.width > 370) {
      image = yield call(
        ImageManipulator.manipulateAsync,
        result.uri,
        [
          {
            resize: {
              width: 370,
            },
          },
        ],
        {
          base64: true,
        },
      );
    } else {
      image = result;
    }
    // set preview before upload image to server
    action.payload.action(image);

    const buffer = Buffer.from(image.base64, 'base64');
    // start upload
    const resultUpload = (yield call(axios, {
      url: '/upload',
      method: 'POST',
      data: buffer,
      headers: {
        'Content-Type': mime.lookup(image.uri),
      },
    })).data;

    yield put(uploadImageSuccess(resultUpload.data.file));
    action.payload.action(resultUpload.data.file);
  } catch (e) {
    yield proceedError(uploadImageFailure, e);
  }
}

export const uploadAttachment = (type = attachmentType.file) => ({
  type: types.UPLOAD_ATTACHMENT,
  payload: {
    type,
  },
});

const uploadAttachmentSuccess = (file) => ({
  type: types.UPLOAD_ATTACHMENT_SUCCESS,
  payload: {
    file,
  },
});

const uploadAttachmentFailure = (error) => ({
  type: types.UPLOAD_ATTACHMENT_FAILURE,
  error,
});

const getMedia = {
  [attachmentType.camera]: async () => {
    return await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });
  },
  [attachmentType.library]: async () => {
    return await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });
  },
  [attachmentType.file]: async () => {
    return await DocumentPicker.getDocumentAsync();
  },
};

export function* onUploadAttachment({ payload: { type } }) {
  try {
    const isHaveCameraRollPermission = yield call(askCameraRollPermission);

    if (!isHaveCameraRollPermission) {
      return;
    }

    if (type === attachmentType.camera) {
      const isHaveCameraPermission = yield call(askCameraPermission);

      if (!isHaveCameraPermission) {
        return;
      }
    }

    // get file from system ui
    const { uri, cancelled, type: userResult } = yield call(getMedia[type]);

    if (
      (type === attachmentType.file && userResult !== 'success') ||
      cancelled
    ) {
      return;
    }

    // add preview of uploading attachment
    const idMessage = generateId();
    let messagePayload = yield generateMessagePayload();

    yield put(
      receiveMessage({
        _id: idMessage,
        text: '',
        ...messagePayload,
        chat: messagePayload.chat._id,
      }),
    );

    // get important info from uri
    const { mimeType, buffer, filename } = yield call(getAssetInfo, uri);

    messagePayload = yield generateMessagePayload({
      attachment: {
        type: mimeType,
        src: uri,
        displayName: filename,
        isUploading: true,
      },
    });

    yield put(
      receiveMessage({
        _id: idMessage,
        text: '',
        ...messagePayload,
        chat: messagePayload.chat._id,
      }),
    );

    // start upload
    const {
      data: { file },
    } = (yield call(axios, {
      url: '/upload',
      method: 'POST',
      data: buffer,
      headers: {
        'Content-Type': mimeType,
        'Display-Name': filename,
      },
    })).data;

    yield put(
      sendMessageRequest('', {
        _id: idMessage,
        attachment: file,
      }),
    );
  } catch (e) {}
}

export const downloadFileAndSave = (payload) => ({
  type: types.DOWNLOAD_FILE_AND_SAVE,
  payload,
});

export function* onDownloadFileAndSave({ payload: { source } }) {
  try {
    const isHaveCameraRollPermission = yield call(askCameraRollPermission);

    if (!isHaveCameraRollPermission) {
      return;
    }

    const filename = source.substring(source.lastIndexOf('/') + 1);

    const { uri } = yield call(
      FileSystem.downloadAsync,
      source,
      FileSystem.documentDirectory + filename,
    );

    yield call(MediaLibrary.createAssetAsync, uri);
  } catch (e) {}
}
