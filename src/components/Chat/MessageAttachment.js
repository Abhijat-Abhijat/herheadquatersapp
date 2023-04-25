import React, {
  useRef,
  useCallback,
  useState,
  useMemo,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Image as NativeImage,
} from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { Video } from 'expo-av';
// hoc
import withNavigation from 'src/modules/core/hocs/withNavigation';
// core components
import Icon from '../Icons/HerHeadquartersIcon';
import Spinner from '../Spinner';
// chat components
import AttachmentIcon from './AttachmentIcon';
// actions
import { toggleMessageContextMenu } from '../../actions/message';
import { downloadFileAndSave } from '../../actions/upload';
// services
import {
  isPhoto,
  compose,
  isVideo,
  generateThumbnail,
} from '../../services/helpers';
import { Asset } from '../../services/StorageService';
import { openLink } from '../../actions/utils';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(2, 186, 194, 0.1)',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  displayNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayName: {
    fontSize: 15,
    lineHeight: 18,
    color: '#02BAC2',
    marginLeft: 10,
  },
  displayNameMaxWidth: {
    maxWidth: 160,
  },
  imageContainer: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    overflow: 'hidden',
    width: '100%',
    height: 140,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  bottomRadius: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  onCenterContainer: {
    zIndex: 100,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      {
        translateX: -12,
      },
      {
        translateY: -12,
      },
    ],
  },
  urlAttachmentContainer: {
    marginTop: 15,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  urlMetaContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderColor: '#E6F8F9',
    borderWidth: 2,
  },
  urlMetaTitle: {
    fontFamily: 'lato-bold',
    fontSize: 13,
    lineHeight: 18,
  },
  urlMetaDescription: {
    fontSize: 11,
    lineHeight: 14,
  },
});

const MessageAttachment = ({
  idMessage,
  attachment: { _id, type, src, isUploading, displayName, extra = {} } = {},
  navigation,
  dispatch,
}) => {
  const isPhotoAttachment = useMemo(() => isPhoto(type), [type]);
  const isVideoAttachment = useMemo(() => isVideo(type), [type]);
  const isUrlAttachment = useMemo(() => type === 'url', [type]);

  let videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const onClickPlayVideo = useCallback(async () => {
    try {
      if (videoRef && !isVideoPlaying) {
        setIsVideoPlaying(true);
        await videoRef.current.presentFullscreenPlayer();
      }
    } catch (e) {}
  }, [videoRef]);

  const onFullScreenUpdate = useCallback(({ fullscreenUpdate }) => {
    if (fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_DID_DISMISS) {
      setIsVideoPlaying(false);

      if (videoRef) {
        videoRef.current.pauseAsync();
      }
    } else if (
      fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT
    ) {
      if (videoRef) {
        videoRef.current.playAsync();
      }
    }
  }, []);

  const [videoPosterUri, setVideoPosterUri] = useState(null);

  useEffect(() => {
    const fetchVideoPoster = async () => {
      if (_id && isVideoAttachment) {
        const cachedPosterUri = await Asset.getAsset(_id);

        if (cachedPosterUri) {
          setVideoPosterUri(cachedPosterUri);
        } else if (src) {
          const { uri } = await generateThumbnail(src);

          await Asset.setAsset(_id, uri);
          setVideoPosterUri(uri);
        }
      }
    };

    fetchVideoPoster();
  }, [_id]);

  const onClickDownloadFileAndSave = () => {
    dispatch(
      downloadFileAndSave({
        source: src,
      }),
    );
    dispatch(toggleMessageContextMenu());
  };

  const onClickMessageContextMenu = useCallback(() => {
    const extraActions = [
      {
        label: 'Download',
        onPress: onClickDownloadFileAndSave,
      },
    ];

    dispatch(
      toggleMessageContextMenu(
        {
          _id: idMessage,
          attachment: {
            _id,
            src,
            type,
            displayName,
          },
        },
        extraActions,
      ),
    );
  }, [dispatch, idMessage, _id, src, type, displayName]);

  return src ? (
    <React.Fragment>
      {isUrlAttachment ? (
        <TouchableWithoutFeedback onPress={() => openLink(src)}>
          <View>
            <View style={[styles.container, styles.urlAttachmentContainer]}>
              <View style={styles.displayNameContainer}>
                <Text style={styles.displayName}>{displayName}</Text>
              </View>
            </View>
            <View style={styles.urlMetaContainer}>
              <Text style={styles.urlMetaTitle}>{extra.title}</Text>
              <Text style={styles.urlMetaDescription}>{extra.description}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback
          onPress={isUploading ? () => null : onClickMessageContextMenu}
        >
          <View
            style={[
              styles.container,
              isPhotoAttachment ? null : styles.bottomRadius,
            ]}
          >
            <View style={styles.displayNameContainer}>
              <AttachmentIcon>
                {isUploading ? (
                  <Spinner isFetching={true} color={'#fff'} size={'small'} />
                ) : (
                  <Icon
                    name={isPhotoAttachment ? 'picture-1' : 'file'}
                    size={20}
                    color={'#fff'}
                  />
                )}
              </AttachmentIcon>
              <Text
                numberOfLines={1}
                style={[styles.displayName, styles.displayNameMaxWidth]}
              >
                {displayName}
              </Text>
            </View>
            {isUploading ? null : (
              <Icon name={'md-more'} size={20} color={'#9D9D9D'} />
            )}
          </View>
        </TouchableWithoutFeedback>
      )}
      {isPhotoAttachment && !isUploading && (
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.push('FullScreenImage', {
              src,
            })
          }
        >
          <View style={styles.imageContainer}>
            <Image
              uri={src}
              style={[styles.image, styles.bottomRadius]}
              resizeMode={'cover'}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
      {isVideoAttachment && !isUploading && (
        <TouchableWithoutFeedback onPress={onClickPlayVideo}>
          <View style={styles.imageContainer}>
            <View style={styles.onCenterContainer}>
              {isVideoPlaying ? (
                <Spinner isFetching={true} color={'#fff'} size={'small'} />
              ) : (
                <Icon name={'play-button'} color={'#fff'} size={25} />
              )}
            </View>
            {videoPosterUri && (
              <NativeImage
                source={{
                  uri: videoPosterUri,
                }}
                style={[styles.image, styles.bottomRadius]}
                resizeMode={'cover'}
              />
            )}
            <Video
              ref={videoRef}
              source={{
                uri: src,
              }}
              onFullscreenUpdate={onFullScreenUpdate}
              resizeMode={Video.RESIZE_MODE_COVER}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
    </React.Fragment>
  ) : null;
};

MessageAttachment.propTypes = {
  attachment: PropTypes.shape({
    _id: PropTypes.string,
    type: PropTypes.string,
    src: PropTypes.string,
    isUploading: PropTypes.bool,
    displayName: PropTypes.string,
  }),
};

export default compose(
  connect(() => ({})),
  withNavigation,
)(MessageAttachment);
