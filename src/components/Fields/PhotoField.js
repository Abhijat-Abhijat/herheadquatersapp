import React from 'react';
import PropTypes from 'prop-types';
import {
  ImageBackground,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
// core components
import Spinner from '../Spinner';
import CrossIconAction from '../Icons/CrossIconAction';
import Avatar from '../User/Avatar';
import AddPhotoIcon from '../Icons/AddPhotoIcon';
import { coolGrey } from '../../assets/jss/styles';
import { photoField } from '../../assets/jss/components/fields';
// actions
import { uploadImageRequest } from '../../actions/upload';

const styles = StyleSheet.create({
  ...photoField,
  spinner: {
    position: 'absolute',
    top: '45%',
    left: '43%',
    zIndex: 999,
  },
  blackOpacity: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(51, 51, 51, 0.6)',
  },
  errorText: {
    color: '#df0000',
    marginTop: 4,
  },
});

class PhotoField extends React.PureComponent {
  static propTypes = {
    imageStyle: PropTypes.object,
    imageContainerStyle: PropTypes.object,
    remove: PropTypes.func,
    standalone: PropTypes.bool,
    label: PropTypes.string,
    avatar: PropTypes.shape({
      name: PropTypes.string,
      size: PropTypes.number,
    }),
    action: PropTypes.element,
  };

  static defaultProps = {
    standalone: false,
  };

  changePhoto = (photo) => {
    this.props.input.onChange(photo);
  };

  remove = () => {
    this.props.input.onChange({});
  };

  render() {
    const {
      input: { value },
      info,
      imageStyle,
      imageContainerStyle,
      remove,
      standalone,
      label,
      action,
      avatar,
    } = this.props;

    const uri = value.uri || value.src;

    if (standalone) {
      return (
        <View style={[styles.imageContainer, imageContainerStyle]}>
          <Text style={styles.label}>{label}</Text>
          {info && <Text style={styles.info}>{info}</Text>}
          <View style={styles.portfolioContainer}>
            {uri ? (
              <>
                <ImageBackground source={{ uri }} style={imageStyle}>
                  {!value._id && <View style={styles.blackOpacity} />}
                  <Spinner
                    isFetching={!value._id}
                    containerStyle={styles.spinner}
                    size={'small'}
                  />
                  {!avatar &&
                    (action || <CrossIconAction onPress={this.remove} />)}
                </ImageBackground>
                {avatar &&
                  (action || <CrossIconAction onPress={this.remove} />)}
              </>
            ) : avatar ? (
              <View>
                <Avatar size={avatar.size} name={avatar.name} />
                {action || <CrossIconAction onPress={this.remove} />}
              </View>
            ) : (
              <TouchableOpacity
                style={imageStyle}
                onPress={() =>
                  this.props.dispatch(uploadImageRequest(this.changePhoto))
                }
              >
                <AddPhotoIcon
                  {...imageStyle}
                  viewBox={'0 0 1024 1024'}
                  fill={coolGrey}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      );
    } else {
      return (
        <ImageBackground source={{ uri }} style={imageStyle}>
          {!value._id && <View style={styles.blackOpacity} />}
          <Spinner
            isFetching={!value._id}
            containerStyle={styles.spinner}
            size={'small'}
          />
          <CrossIconAction onPress={remove} />
        </ImageBackground>
      );
    }
  }
}

export default connect()(PhotoField);
