import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, Platform, View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import UserAvatar from 'react-native-user-avatar';
// hoc
import withNavigation from 'src/modules/core/hocs/withNavigation';

const styles = StyleSheet.create({
  avatar: {
    ...Platform.select({
      ios: {
        borderRadius: 100,
        overflow: 'hidden',
      },
      android: {},
    }),
  },
  image: {
    width: '100%',
    height: '100%',
    ...Platform.select({
      ios: {},
      android: {
        borderRadius: 100,
      },
    }),
  },
});

class Avatar extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.oneOfType([
      PropTypes.shape({
        src: PropTypes.string,
      }),
      PropTypes.string,
    ]),
    size: PropTypes.number.isRequired,
    idUser: PropTypes.string,
    toProfile: PropTypes.bool,
  };

  static defaultProps = {
    toProfile: true,
  };

  shouldComponentUpdate({ avatar, name, idUser }) {
    const prevAvatar =
      typeof this.props.avatar === 'string' ? {} : this.props.avatar;
    const nextAvatar = !avatar || typeof avatar === 'string' ? {} : avatar;

    if (!prevAvatar) {
      return true;
    }

    return (
      prevAvatar.src !== nextAvatar.src ||
      name !== this.props.name ||
      idUser !== this.props.idUser
    );
  }

  render() {
    let { avatar, name, size, idUser, navigation, toProfile } = this.props;

    const sizeStyle = {
      width: size,
      height: size,
    };

    avatar = typeof avatar === 'string' ? {} : avatar;

    const content = avatar ? (
      <Image uri={avatar.src} style={styles.image} />
    ) : (
      <UserAvatar name={name} size={size} />
    );

    if (toProfile) {
      return (
        <TouchableOpacity
          onPress={
            idUser
              ? () =>
                  navigation.navigate('Profile', {
                    idUser,
                  })
              : () => null
          }
          style={[styles.avatar, sizeStyle]}
        >
          {content}
        </TouchableOpacity>
      );
    } else {
      return <View style={[styles.avatar, sizeStyle]}>{content}</View>;
    }
  }
}

export default withNavigation(Avatar);
