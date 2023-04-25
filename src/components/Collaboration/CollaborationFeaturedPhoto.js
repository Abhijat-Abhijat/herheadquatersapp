import React from 'react';
import PropTypes from 'prop-types';
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  Image as ImageNative,
} from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { getShortState } from '../../actions/utils';

const styles = StyleSheet.create({
  imageContainer: {
    height: 250,
  },
  imageContainerOwn: {
    height: 341,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(51, 51, 51, 0.5)',
  },
  title: {
    fontFamily: 'lato-bold',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0,
    marginBottom: 6,
    textAlign: 'center',
    maxWidth: 240,
  },
  secondTitle: {
    fontSize: 17,
    letterSpacing: 0,
    lineHeight: 23,
  },
  backgroundImageContainerOwn: {
    flex: 1,
    height: 250,
    overflow: 'hidden',
    position: 'relative',
    top: 19,
    marginTop: -19,
  },
  backgroundImageOwn: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: 0,
  },
  bottomInfoContainerOwn: {
    backgroundColor: '#fff',
    zIndex: 100,
    paddingTop: 18,
    paddingBottom: 15,
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});

export default class CollaborationFeaturedPhoto extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    photo: PropTypes.shape({
      path: PropTypes.string,
      src: PropTypes.string,
    }),
    type: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    mode: PropTypes.oneOf(['default', 'own']),
  };

  static defaultProps = {
    mode: 'default',
  };

  render() {
    const {
      city,
      state,
      photo,
      title,
      type,
      mode,
      industry,
      remote,
    } = this.props;

    return (
      <View
        style={
          mode === 'default' ? styles.imageContainer : styles.imageContainerOwn
        }
      >
        {mode === 'default' ? (
          <ImageBackground
            style={styles.backgroundImage}
            source={{ uri: photo.path || photo.src }}
          >
            <View style={styles.imageOverlay} />
            <Text style={[styles.title, { color: '#fff' }]}>{title}</Text>
            {city && state ? (
              <Text style={[styles.secondTitle, { color: '#fff' }]}>
                {remote ? 'National' : 'Local'}
                {' - '}
                {city}
                {state && ', '}
                {getShortState(state)}
              </Text>
            ) : (
              <Text style={[styles.secondTitle, { color: '#fff' }]}>
                Remote
              </Text>
            )}
            <Text
              style={[
                styles.secondTitle,
                {
                  marginBottom: 10,
                  color: '#fff',
                },
              ]}
            >
              {type}
            </Text>
          </ImageBackground>
        ) : (
          <>
            <View style={styles.backgroundImageContainerOwn}>
              {photo.path ? (
                <ImageNative
                  source={{ uri: photo.path }}
                  style={styles.backgroundImageOwn}
                  resizeMode={'cover'}
                />
              ) : (
                <Image
                  uri={photo.src}
                  style={styles.backgroundImageOwn}
                  resizeMode={'cover'}
                />
              )}
            </View>
            <View style={styles.bottomInfoContainerOwn}>
              <Text style={styles.title}>{title}</Text>
              {city && state ? (
                <Text style={styles.secondTitle}>
                  {remote ? 'National' : 'Local'}
                  {' - '}
                  {city}
                  {state && ', '}
                  {getShortState(state)}
                </Text>
              ) : (
                <Text style={styles.secondTitle}>Remote</Text>
              )}
              <Text style={styles.secondTitle}>{type}</Text>
            </View>
          </>
        )}
      </View>
    );
  }
}
