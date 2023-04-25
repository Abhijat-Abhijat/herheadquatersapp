import React, { useCallback, useState } from 'react';
import { View, Alert, Text } from 'react-native';
import { connect } from 'react-redux';
import { Image } from 'react-native-expo-image-cache';
import PropTypes from 'prop-types';
// components
import PotentialPartnerPreviewBoxHeader from 'src/modules/user/components/PotentialPartners/PreviewBoxHeader';
import PotentialPartnerPreviewBoxFooter from 'src/modules/user/components/PotentialPartners/PreviewBoxFooter';
import PotentialPartnerPreviewBoxModal from 'src/modules/user/components/PotentialPartners/PreviewBoxModal';
// services
import NavigationService from 'src/services/NavigationService';
// actions
import { addUserToFavoriteRequest } from 'src/actions/user';
import { potentialPartnersCollaborate } from 'src/modules/user/actions';
import { createComplaint } from 'src/actions/complaint';
// selectors
import { isProfileFavorite } from 'src/selectors/user';
import {
  selectPotentialPartner,
  selectPotentialPartnerFullName,
  selectPotentialPartnerAvatar,
} from 'src/modules/user/selectors';
// account plan types
import { premiumPlus } from 'src/modules/payment/planTypes';
// styles
import styles from './PotentialPartnerPreviewBox.styled';

function PotentialPartnerPreviewBox(props) {
  const {
    userId,
    onRefresh,
    dispatch,
    user,
    fullName,
    avatar,
    isUserFavorite,
  } = props;

  const [isOpen, setOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setOpen((isOpen) => !isOpen);
  }, [setOpen]);

  const blockUser = useCallback(() => {
    Alert.alert(
      `Block ${fullName}`,
      'Are you sure you want to block this user?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            toggleModal();
            dispatch(createComplaint('user', userId, ['Content']));
            setTimeout(() => {
              onRefresh();
            }, 500);
          },
        },
        { cancelable: false },
      ],
    );
  }, [fullName, userId, dispatch, toggleModal, onRefresh]);

  const clickViewProfile = useCallback(() => {
    NavigationService.navigate('Profile', {
      idUser: userId,
    });
  }, [userId]);

  const clickCollaborate = useCallback(() => {
    dispatch(
      potentialPartnersCollaborate({
        userId,
        name: fullName,
      }),
    );
  }, [dispatch, userId, fullName]);

  const addUserToFavorite = useCallback(() => {
    dispatch(addUserToFavoriteRequest(userId));
  }, [dispatch, userId]);

  const showBadge = user?.plan === premiumPlus.name;

  return (
    <View style={styles.wrapper}>
      <View style={styles.imageWrapper}>
        <Image uri={avatar.src} style={styles.image} />
      </View>
      <PotentialPartnerPreviewBoxHeader
        fullName={fullName}
        companyName={user?.companyName}
        position={user.position}
        showBadge={showBadge}
        toggleModal={toggleModal}
      />
      <View style={styles.aboutContainer}>
        <Text style={styles.about} numberOfLines={4}>
          {user.aboutCompany}
        </Text>
      </View>
      <View style={styles.separator} />
      <PotentialPartnerPreviewBoxFooter
        clickViewProfile={clickViewProfile}
        clickCollaborate={clickCollaborate}
        addUserToFavorite={addUserToFavorite}
        isUserFavorite={isUserFavorite}
      />
      <PotentialPartnerPreviewBoxModal
        isOpen={isOpen}
        toggleModal={toggleModal}
        blockUser={blockUser}
        addUserToFavorite={addUserToFavorite}
        isUserFavorite={isUserFavorite}
      />
    </View>
  );
}

PotentialPartnerPreviewBox.propTypes = {
  userId: PropTypes.string,
  onRefresh: PropTypes.func,
};

function mapStateToProps(state, { userId }) {
  return {
    user: selectPotentialPartner(state, userId),
    fullName: selectPotentialPartnerFullName(state, userId),
    avatar: selectPotentialPartnerAvatar(state, userId),
    isUserFavorite: isProfileFavorite(state, userId),
  };
}

export default connect(mapStateToProps)(PotentialPartnerPreviewBox);
