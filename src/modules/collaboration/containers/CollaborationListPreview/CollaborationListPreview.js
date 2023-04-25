import React, { useCallback } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Image } from 'react-native-expo-image-cache';
import moment from 'moment';
// hoc
import withNavigation from 'src/modules/core/hocs/withNavigation';
// components
import Avatar from 'src/components/User/Avatar';
import Icon from 'src/components/Icons/HerHeadquartersIcon';
import PremiumPlusBadge from 'src/modules/core/components/PremiumPlusBadge';
// actions
import { addCollaborationToFavoriteRequest } from 'src/actions/collaboration';
// selectors
import { isCollaborationFavorite } from 'src/selectors/user';
// account plan types
import { premiumPlus } from 'src/modules/payment/planTypes';
// styles
import { primaryColor } from 'src/assets/jss/styles';
import styles from './CollaborationListPreview.styled';

function CollaborationListPreview({ collaboration, navigation }) {
  const dispatch = useDispatch();

  const isFavorite = useSelector((state) => {
    return isCollaborationFavorite(state, collaboration._id);
  });

  const toogleFavorite = useCallback(() => {
    dispatch(addCollaborationToFavoriteRequest(collaboration._id));
  }, [dispatch, collaboration._id]);

  const handleClick = useCallback(() => {
    navigation.navigate('CollaborationView', {
      idCollaboration: collaboration._id,
    });
  }, [navigation]);

  const seekingText =
    collaboration.industry &&
    (typeof collaboration.industry === 'string'
      ? collaboration.industry
      : collaboration.industry.join(', '));
  const perksText = collaboration.perks.join(', ');

  const showPremiumPlusBadge = collaboration?.author?.plan === premiumPlus.name;

  const fullName = `${collaboration.author.firstName} ${collaboration.author.lastName}`;

  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
      <View style={styles.photoContainer}>
        <Image uri={collaboration.photo?.src} style={styles.image} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{collaboration.title}</Text>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Avatar
              size={37}
              name={fullName}
              avatar={collaboration.author.avatar}
              idUser={collaboration.author._id}
            />
          </View>
          <View style={styles.authorInfoContainer}>
            <View style={styles.topRow}>
              <View style={styles.topRowLeftContainer}>
                <Text style={styles.topRowLeft}>
                  {collaboration.author.companyName}
                </Text>
                {showPremiumPlusBadge && <PremiumPlusBadge />}
              </View>
              <Text style={styles.topRowRight}>
                {moment(collaboration.createdAt).fromNow()}
              </Text>
            </View>
            <Text style={styles.bottomRow}>
              {fullName}
              {collaboration.author?.position &&
                `, ${collaboration.author.position}`}
            </Text>
          </View>
        </View>
        <Text style={styles.overview} numberOfLines={3}>
          {collaboration.overview}
        </Text>
        <View style={styles.br} />
        <Text style={styles.infoTitle}>Partnership Highlights</Text>
        <Text style={styles.infoOptionContainer}>
          <Text style={styles.infoOptionTitle}>Seeking: </Text>
          <Text style={styles.infoOptionValue}>{seekingText}</Text>
        </Text>
        <Text style={styles.infoOptionContainer}>
          <Text style={styles.infoOptionTitle}>Location: </Text>
          <Text style={styles.infoOptionValue}>
            {collaboration.remote ? 'National' : 'Local'}
          </Text>
        </Text>
        <Text style={styles.infoOptionContainer}>
          <Text style={styles.infoOptionTitle}>Partnership Perks: </Text>
          <Text style={styles.infoOptionValue}>{perksText}</Text>
        </Text>
        <Text style={styles.infoOptionContainer}>
          <Text style={styles.infoOptionTitle}>Value of Perks Received: </Text>
          <Text style={styles.infoOptionValue}>
            {collaboration.totalPartnership || '-'}
          </Text>
        </Text>
        <TouchableOpacity
          style={styles.favoriteContainer}
          onPress={toogleFavorite}
        >
          <Icon
            name={isFavorite ? 'ios-heart' : 'ios-heart-empty'}
            size={26}
            color={primaryColor.main}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default withNavigation(CollaborationListPreview);
