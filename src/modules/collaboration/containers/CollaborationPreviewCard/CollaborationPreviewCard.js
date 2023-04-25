import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
// components
import Icon from 'src/components/Icons/HerHeadquartersIcon';
// actions
import { addCollaborationToFavoriteRequest } from 'src/actions/collaboration';
// selectors
import { isCollaborationFavorite } from 'src/selectors/user';
// styles
import { primaryColor } from 'src/assets/jss/styles';
import styles from './CollaborationPreviewCard.styled';

function CollaborationPreviewCard({ style, collaboration }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const isFavorite = useSelector((state) => {
    return isCollaborationFavorite(state, collaboration._id);
  });

  const toogleFavorite = useCallback(() => {
    dispatch(addCollaborationToFavoriteRequest(collaboration._id));
  }, [dispatch, collaboration._id]);

  const handleClick = useCallback(() => {
    navigation.push('CollaborationView', {
      idCollaboration: collaboration._id,
    });
  }, [navigation]);

  return (
    <TouchableOpacity onPress={handleClick} style={[styles.container, style]}>
      <Image style={styles.image} uri={collaboration.photo.src} />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {collaboration.title}
        </Text>
        <Text style={styles.company} numberOfLines={1}>
          {collaboration.author.companyName}
        </Text>
        <View style={styles.divider} />
        <Text style={styles.valueText} numberOfLines={1}>
          {'Total Value of Perks'}
        </Text>
        <Text style={styles.value} numberOfLines={1}>
          <Text style={styles.valueText}>{'Received: '}</Text>
          {collaboration.totalPartnership}
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

export default CollaborationPreviewCard;
