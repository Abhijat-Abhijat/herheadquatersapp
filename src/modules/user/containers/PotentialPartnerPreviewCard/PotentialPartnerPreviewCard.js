import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
// components
import Button from 'src/components/Buttons/Button';
// actions
import { potentialPartnersCollaborate } from 'src/modules/user/actions';
// styles
import styles from './PotentialPartnerPreviewCard.styled';

function PotentialPartnerPreviewCard({ style, partner }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const fullName = `${partner.firstName} ${partner.lastName}`;
  const userId = partner._id;

  const handleViewProfile = useCallback(() => {
    navigation.navigate('Profile', {
      idUser: userId,
    });
  }, [navigation, userId]);

  const handleCollaborate = useCallback(() => {
    dispatch(
      potentialPartnersCollaborate({
        userId,
        name: fullName,
      }),
    );
  }, [dispatch, userId, fullName]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.infoContainer}>
        <Image style={styles.image} uri={partner.avatar.src} />
        <View style={styles.textInfoContainer}>
          <Text style={styles.titleText} numberOfLines={1}>
            {partner.companyName}
          </Text>
          <Text style={styles.defaultText} numberOfLines={1}>
            {fullName}
          </Text>
          <Text style={styles.defaultText} numberOfLines={1}>
            {partner.position}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          type="secondary"
          styleButton={{ ...styles.button, ...styles.profileButton }}
          onPress={handleViewProfile}
        >
          <Text style={styles.profileButtonText}>View Profile</Text>
        </Button>
        <Button
          styleButton={{ ...styles.button, ...styles.partnerButton }}
          onPress={handleCollaborate}
        >
          <Text style={styles.partnerButtonText}>Partner</Text>
        </Button>
      </View>
    </View>
  );
}

export default PotentialPartnerPreviewCard;
