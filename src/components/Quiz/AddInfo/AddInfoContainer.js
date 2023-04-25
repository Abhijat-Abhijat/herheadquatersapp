import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { reduxForm, Field } from 'redux-form';
// components
import Button from 'src/components/Buttons/Button';
import PhotoFieldWithError from 'src/modules/core/containers/fields/PhotoFieldWithError';
import TextField from 'src/components/Fields/TextField';
import PlusIconAction from 'src/components/Icons/PlusIconAction';
import HelpMenuModal from 'src/components/Modal/HelpMenuModal';
// actions
import { uploadImageRequest } from 'src/actions/upload';
import { sendQuizInfoRequest } from 'src/actions/quiz';
// styles
import { primaryColor } from 'src/assets/jss/styles';

const styles = StyleSheet.create({
  wrapper: {
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%',
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  imageContainerStyle: {
    width: 130,
    marginBottom: 46,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 90,
    overflow: 'hidden',
  },
  bottomWrapper: {
    marginBottom: 40,
  },
  line: {
    backgroundColor: '#979797',
    height: 1,
    width: '100%',
    marginBottom: 40,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
  },
  aboutWrapper: {
    fontSize: 13,
  },
  aboutText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  modalRow: {
    paddingTop: 15,
    paddingBottom: 19,
    borderTopWidth: 1,
    borderTopColor: 'rgb(217,217,217)',
    width: '100%',
  },
  simpleButtonText: {
    color: primaryColor.main,
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
    textAlign: 'center',
  },
});

const aboutCompanyProps = { multiline: true, blurOnSubmit: true };
const avatarProps = {
  size: 130,
  name: 'ai',
};

function AddInfoContainer({ dispatch, change, handleSubmit }) {
  const [avatarModalIsOpen, setAvatarModalOpen] = useState(false);

  const toggleAvatarModal = useCallback(() => {
    setAvatarModalOpen((opened) => !opened);
  }, [avatarModalIsOpen, setAvatarModalOpen]);

  const setAvatarModal = useCallback(
    (status) => {
      setAvatarModalOpen(status);
    },
    [setAvatarModalOpen],
  );

  const changeAvatar = useCallback(
    (photo) => {
      if (photo) {
        change('avatar', photo);
      } else {
        change('avatar', {});
      }
      setAvatarModal(false);
    },
    [change, setAvatarModal],
  );

  const takePhoto = useCallback(() => {
    dispatch(uploadImageRequest(changeAvatar, 'camera'));
  }, [dispatch]);

  const chooseFromLibrary = useCallback(() => {
    dispatch(uploadImageRequest(changeAvatar));
  }, [dispatch]);

  const handleClickNext = useCallback(() => {
    dispatch(sendQuizInfoRequest());
  }, [dispatch]);

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <View>
          <Field
            name="avatar"
            component={PhotoFieldWithError}
            formControlStyles={styles.avatarContainer}
            imageContainerStyle={styles.imageContainerStyle}
            imageStyle={styles.avatar}
            standalone
            avatar={avatarProps}
            action={<PlusIconAction onPress={toggleAvatarModal} />}
          />
          <View style={styles.aboutWrapper}>
            <Text style={styles.aboutText}>About Company*</Text>
            <Field
              name="aboutCompany"
              component={TextField}
              inputProps={aboutCompanyProps}
            />
          </View>
        </View>
        <View style={styles.bottomWrapper}>
          <View style={styles.line} />
          <Button type="primary" onPress={handleSubmit(handleClickNext)}>
            <Text style={styles.nextButtonText}>Next step</Text>
          </Button>
        </View>

        <HelpMenuModal
          title={'Add Profile Photo'}
          isOpen={avatarModalIsOpen}
          toggleModal={toggleAvatarModal}
        >
          <TouchableOpacity style={styles.modalRow} onPress={takePhoto}>
            <Text style={styles.simpleButtonText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalRow} onPress={chooseFromLibrary}>
            <Text style={styles.simpleButtonText}>Choose from Library</Text>
          </TouchableOpacity>
        </HelpMenuModal>
      </View>
    </ScrollView>
  );
}

function validate(values) {
  const errors = {};
  if (!values.avatar) {
    errors.avatar = 'You must provide avatar to proceed!';
  }
  if (!values.aboutCompany) {
    errors.aboutCompany = 'Required';
  }
  return errors;
}

const formName = 'quizIntro';

export default reduxForm({
  form: formName,
  initialValues: {
    avatar: '',
    aboutCompany: '',
  },
  validate,
})(AddInfoContainer);
