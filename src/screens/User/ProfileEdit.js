import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
// core components
import Spinner from 'src/components/Spinner';
import ProfileEditForm from 'src/components/Forms/ProfileEditForm';
// actions
import { updateProfileRequest } from 'src/actions/user';
// selectors
import { getProfile, getIsFetchingProfile } from 'src/selectors/user';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingBottom: 29,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

function ProfileEdit() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const profile = useSelector(getProfile);
  const isFetching = useSelector(getIsFetchingProfile);

  const handleSubmit = (values) => {
    dispatch(
      updateProfileRequest(
        {
          profile: values,
          portfolio: values.portfolio,
          avatar: values.avatar,
        },
        () => navigation.goBack(),
      ),
    );
  };

  const initialValues = useMemo(() => {
    return {
      ...profile,
      // for some reason textinput does not show values with type number so we convert it to string
      yearsInBusiness:
        profile.yearsInBusiness && String(profile.yearsInBusiness),
    };
  }, [profile]);

  return (
    <Spinner isFetching={isFetching} onCenter>
      <ProfileEditForm
        contentContainerStyle={styles.container}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      />
    </Spinner>
  );
}

export const screenOptions = {
  title: 'Edit Profile',
};

export default ProfileEdit;
