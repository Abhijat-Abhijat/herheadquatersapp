import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
// components
import Icon from 'src/components/Icons/HerHeadquartersIcon';
// styles
import { primaryColor } from 'src/assets/jss/styles';
import styles from './CollaborationViewIconsSection.styled';

const activeStatuses = ['active', 'progress'];

function CollaborationViewIconsSection({
  isMyCollaboration,
  collaborationStatus,
  authorName,
  isCollaborationFavorite,
  handleJoinToCollaboration,
  handleJoinToChat,
  handleAddCollaborationToFavorite,
  handleShareCollaboration,
  handleDeleteCollaboration,
}) {
  const isCollaborationActive = activeStatuses.includes(collaborationStatus);

  return (
    <View style={styles.container}>
      {!isMyCollaboration ? (
        <>
          <View style={styles.iconsRow}>
            {collaborationStatus === 'active' && (
              <TouchableOpacity
                onPress={handleJoinToCollaboration}
                style={styles.iconItem}
              >
                <Icon name={'ios-hand'} size={25} color={primaryColor.main} />
                <Text style={styles.iconText}>Request to Join Partnership</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={handleJoinToChat}
              style={styles.iconItem}
            >
              <Icon
                name={'ios-chatboxes'}
                size={25}
                color={primaryColor.main}
              />
              <Text style={styles.iconText}>Send Message to {authorName}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.iconsRow}>
            <TouchableOpacity
              onPress={handleAddCollaborationToFavorite}
              style={styles.iconItem}
            >
              <Icon
                name={isCollaborationFavorite ? 'ios-heart' : 'ios-heart-empty'}
                size={25}
                color={primaryColor.main}
              />
              <Text style={styles.iconText}>Save Partnership to favorites</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleShareCollaboration}
              style={styles.iconItem}
            >
              <FontAwesome5
                name={'share'}
                size={24}
                color={primaryColor.main}
              />
              <Text style={styles.iconText}>
                Share Partnership with a Friend
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        isCollaborationActive && (
          <View style={[styles.iconsRow, styles.ownCollaborationIcons]}>
            <TouchableOpacity
              onPress={handleDeleteCollaboration}
              style={styles.iconItem}
            >
              <Icon
                name={'ios-close-circle'}
                size={25}
                color={primaryColor.main}
              />
              <Text style={styles.iconText}>
                {collaborationStatus === 'active'
                  ? 'Remove Partnership'
                  : 'End Partnership Early'}
              </Text>
            </TouchableOpacity>
          </View>
        )
      )}
    </View>
  );
}

export default CollaborationViewIconsSection;
