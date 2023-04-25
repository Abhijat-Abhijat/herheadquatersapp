import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { reduxForm, Field, FieldArray, formValueSelector } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
// core components
import TextField from 'src/components/Fields/TextField';
import SelectField from 'src/components/Fields/SelectField';
import PhotoArrayField from 'src/components/Fields/PhotoArrayField';
import Button from 'src/components/Buttons/Button';
import Spinner from 'src/components/Spinner';
import PhotoField from 'src/components/Fields/PhotoField';
import PlusIconAction from 'src/components/Icons/PlusIconAction';
import HelpMenuModal from 'src/components/Modal/HelpMenuModal';
import LimitedTextField from 'src/modules/core/containers/fields/LimitedTextField';
import PrependTextField from 'src/modules/core/containers/fields/PrependTextField';
// hooks
import useAlertOnBack from 'src/modules/core/hooks/useAlertOnBack';
// actions
import { uploadImageRequest } from 'src/actions/upload';
// selectors
import { getIsFetchingUpdateProfile } from 'src/selectors/user';
// utils
import {
  states,
  businessType,
  industryOptionList,
  companyRoles,
} from 'src/components/Fields/enums';
import { createReduxFormSchemaValidator } from 'src/services/helpers';
import { FormScrollService } from 'src/services/FormScrollService';
// styles
import { primaryColor } from 'src/assets/jss/styles';
import styles from './ProfileEditForm.styled';

const formScrollService = new FormScrollService();

const socialLinks = ['instagram', 'facebook', 'twitter'];

function ProfileEditForm(props) {
  const { change, submit, contentContainerStyle, dirty, submitSucceeded } =
    props;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const isFetching = useSelector(getIsFetchingUpdateProfile);
  const avatar = useSelector((state) => valueSelector(state, 'avatar'));
  const firstName = useSelector((state) => valueSelector(state, 'firstName'));
  const lastName = useSelector((state) => valueSelector(state, 'lastName'));

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  const toggleAvatarModal = () => {
    setIsAvatarModalOpen(!isAvatarModalOpen);
  };

  const changeAvatar = (photo) => {
    if (photo) {
      change('avatar', photo);

      if (photo.uri) {
        toggleAvatarModal();
      }
    } else {
      change('avatar', {});
      toggleAvatarModal();
    }
  };

  const removeAvatar = () => {
    changeAvatar();
    toggleAvatarModal();
  };

  const takePhoto = () => {
    dispatch(uploadImageRequest(changeAvatar, 'camera'));
  };

  const chooseFromLibrary = () => {
    dispatch(uploadImageRequest(changeAvatar));
  };

  const handleLeave = useCallback(({ forceBack }) => {
    forceBack();
  }, []);

  const handleStay = useCallback(() => {
    submit();
  }, [submit]);

  useEffect(() => {
    return () => {
      formScrollService.reset();
    };
  }, []);

  useAlertOnBack(submitSucceeded ? false : dirty, {
    title: 'Save changes',
    message: 'Do you want to save your changes before leaving this page?',
    leaveText: 'Discard',
    handleLeave,
    stayText: 'Save',
    handleStay,
  });

  const fullName = `${firstName} ${lastName}`;

  return (
    <ScrollView
      contentContainerStyle={contentContainerStyle}
      ref={formScrollService.setContainerRef}
    >
      <Field
        name={'avatar'}
        component={PhotoField}
        imageStyle={styles.avatar}
        imageContainerStyle={styles.avatarContainer}
        standalone
        avatar={{
          size: 130,
          name: fullName,
        }}
        action={<PlusIconAction onPress={toggleAvatarModal} />}
        formControlProps={{
          onLayout: ({ nativeEvent }) =>
            formScrollService.addField('avatar', nativeEvent.layout),
        }}
      />
      <Field
        name={'firstName'}
        component={TextField}
        label={'FIRST NAME'}
        formControlStyles={styles.field}
        formControlProps={{
          onLayout: ({ nativeEvent }) =>
            formScrollService.addField('firstName', nativeEvent.layout),
        }}
      />
      <Field
        name={'lastName'}
        component={TextField}
        label={'LAST NAME'}
        formControlStyles={styles.field}
        formControlProps={{
          onLayout: ({ nativeEvent }) =>
            formScrollService.addField('lastName', nativeEvent.layout),
        }}
      />
      <Field
        name={'phone'}
        component={TextField}
        label={'PHONE'}
        formControlStyles={styles.field}
        formControlProps={{
          onLayout: ({ nativeEvent }) =>
            formScrollService.addField('phone', nativeEvent.layout),
        }}
      />
      <Field
        name={'companyName'}
        component={TextField}
        label={'COMPANY NAME'}
        formControlStyles={styles.field}
        formControlProps={{
          onLayout: ({ nativeEvent }) =>
            formScrollService.addField('companyName', nativeEvent.layout),
        }}
      />
      <Field
        name={'position'}
        component={SelectField}
        label={'WHICH POSITION BEST DESCRIBES YOUR ROLE?'}
        title={'Which position best describes your role?'}
        options={companyRoles}
        formControlStyles={styles.field}
        formControlProps={{
          onLayout: ({ nativeEvent }) =>
            formScrollService.addField('position', nativeEvent.layout),
        }}
      />
      <Field
        name={'aboutCompany'}
        component={TextField}
        label="COMPANY INFO"
        formControlStyles={styles.field}
        inputProps={{ multiline: true }}
        formControlProps={{
          onLayout: ({ nativeEvent }) =>
            formScrollService.addField('aboutCompany', nativeEvent.layout),
        }}
      />
      <Field
        name={'companyWebsite'}
        component={TextField}
        label={'COMPANY WEBSITE'}
        formControlStyles={styles.field}
        formControlProps={{
          onLayout: ({ nativeEvent }) =>
            formScrollService.addField('companyWebsite', nativeEvent.layout),
        }}
      />
      {socialLinks.map((socialName) => (
        <Field
          key={socialName}
          name={'socialLinks.' + socialName}
          component={PrependTextField}
          prependText={`https://${socialName}.com/`}
          label={socialName.toUpperCase()}
          containerStyle={styles.field}
          inputProps={{
            autoCapitalize: 'none',
          }}
        />
      ))}
      <Field
        name={'city'}
        component={TextField}
        label={'CITY'}
        formControlStyles={styles.field}
        formControlProps={{
          onLayout: ({ nativeEvent }) =>
            formScrollService.addField('city', nativeEvent.layout),
        }}
      />
      <Field
        name={'state'}
        component={SelectField}
        label={'STATE'}
        formControlStyles={styles.field}
        options={states}
        title={'State'}
        formControlProps={{
          onLayout: ({ nativeEvent }) =>
            formScrollService.addField('state', nativeEvent.layout),
        }}
      />
      <Field
        name={'yearsInBusiness'}
        component={TextField}
        label={'YEARS IN BUSINESS'}
        formControlStyles={styles.field}
        inputProps={{
          keyboardType: 'numeric',
        }}
        formControlProps={{
          onLayout: ({ nativeEvent }) =>
            formScrollService.addField('yearsInBusiness', nativeEvent.layout),
        }}
      />
      <Field
        name={'industry'}
        component={SelectField}
        label={'INDUSTRY'}
        formControlStyles={styles.field}
        options={industryOptionList}
        title={'Industry'}
        formControlProps={{
          onLayout: ({ nativeEvent }) =>
            formScrollService.addField('industry', nativeEvent.layout),
        }}
      />
      <Field
        name={'businessType'}
        component={SelectField}
        label={'BUSINESS TYPE'}
        formControlStyles={styles.field}
        options={businessType}
        title={'Business Type'}
        formControlProps={{
          onLayout: ({ nativeEvent }) =>
            formScrollService.addField('businessType', nativeEvent.layout),
        }}
      />
      <Field
        name={'about'}
        component={LimitedTextField}
        label={'ABOUT'}
        formControlStyles={styles.field}
        inputProps={{
          multiline: true,
          maxLength: 700,
        }}
        formControlProps={{
          onLayout: ({ nativeEvent }) =>
            formScrollService.addField('about', nativeEvent.layout),
        }}
      />
      <Field
        name={'seeking'}
        component={LimitedTextField}
        label={'DREAM BRAND PARTNERSHIP'}
        formControlStyles={styles.field}
        inputProps={{
          multiline: true,
          maxLength: 500,
        }}
        formControlProps={{
          onLayout: ({ nativeEvent }) =>
            formScrollService.addField('seeking', nativeEvent.layout),
        }}
      />
      <FieldArray
        name={'portfolio'}
        component={PhotoArrayField}
        label={'PORTFOLIO'}
        imageStyle={styles.image}
        max={3}
        formControlProps={{
          onLayout: ({ nativeEvent }) =>
            formScrollService.addField('portfolio', nativeEvent.layout),
        }}
      />
      <Spinner isFetching={isFetching}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.goBack()}
            type={'secondary'}
            styleButton={styles.button}
          >
            <Text style={[styles.buttonText, { color: primaryColor.main }]}>
              Cancel
            </Text>
          </Button>
          <Button onPress={submit} type={'primary'} styleButton={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </Button>
        </View>
      </Spinner>
      <HelpMenuModal
        title={'Change Profile Photo'}
        isOpen={isAvatarModalOpen}
        toggleModal={toggleAvatarModal}
      >
        {avatar && avatar.src && (
          <TouchableOpacity style={styles.modalRow} onPress={removeAvatar}>
            <Text style={[styles.simpleButtonText, styles.removeButtonText]}>
              Remove Current Photo
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.modalRow} onPress={takePhoto}>
          <Text style={styles.simpleButtonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalRow} onPress={chooseFromLibrary}>
          <Text style={styles.simpleButtonText}>Choose from Library</Text>
        </TouchableOpacity>
      </HelpMenuModal>
    </ScrollView>
  );
}

export const formName = 'profile';

export const valueSelector = formValueSelector(formName);

const validationSchema = yup.object().shape({
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  phone: yup.string().required('Required'),
  companyName: yup.string().required('Required'),
  position: yup.string().required('Required'),
  city: yup.string().required('Required'),
  industry: yup.string().required('Required'),
});

ProfileEditForm = reduxForm({
  form: formName,
  validate: createReduxFormSchemaValidator(validationSchema),
  onSubmitFail: (errors) => {
    formScrollService.scrollToErrorField(errors);
  },
})(ProfileEditForm);

export default ProfileEditForm;
