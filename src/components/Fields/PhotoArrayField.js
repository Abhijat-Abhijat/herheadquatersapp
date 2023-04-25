import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { TouchableOpacity, View, Text } from 'react-native';
// core components
import PhotoField from './PhotoField';
import AddPhotoIcon from '../Icons/AddPhotoIcon';
// actions
import { uploadImageRequest } from '../../actions/upload';
import { coolGrey } from '../../assets/jss/styles';
import { photoField as styles } from '../../assets/jss/components/fields';

class Photo extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string,
    max: PropTypes.number,
    imageStyle: PropTypes.object,
  };

  removePhoto = (index) => () => {
    this.props.fields.remove(index);
  };

  pushPhoto = (photo) => {
    if (photo._id) {
      this.props.fields.pop();
    }
    this.props.fields.push(photo);
  };

  render() {
    const { fields, label, imageStyle, max } = this.props;

    return (
      <View style={styles.imageContainer}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.portfolioContainer}>
          {fields.map((image, index) => {
            return (
              <Field
                key={index}
                name={image}
                component={PhotoField}
                imageStyle={imageStyle}
                remove={this.removePhoto(index)}
              />
            );
          })}
          {fields.length < max && (
            <TouchableOpacity
              style={imageStyle}
              onPress={() =>
                this.props.dispatch(uploadImageRequest(this.pushPhoto))
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
  }
}

export default connect()(Photo);
