import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
// components
import Icon from 'src/components/Icons/HerHeadquartersIcon';
// utils
import { getCollaborationReviewStatusLabel } from 'src/modules/collaborationReview/collaborationReview.utils';
import { collaborationReviewStatusMap } from 'src/modules/collaborationReview/collaborationReview.enum';
// styles
import styles from './CollaborationReviewPreviewBox.styled';

function getBackgroundLabelColorByStatus(status) {
  switch (status) {
    case collaborationReviewStatusMap.wait.value: {
      return '#FDE3C5';
    }

    case collaborationReviewStatusMap.reviewed.value: {
      return 'rgba(127, 213, 133, 0.2)';
    }

    default: {
      return '#FDE3C5';
    }
  }
}

function createDateTextByStatus(date, status) {
  const dateText = moment(date).fromNow();

  switch (status) {
    case collaborationReviewStatusMap.wait.value: {
      return `Submitted ${dateText}`;
    }

    case collaborationReviewStatusMap.reviewed.value: {
      return `Received ${dateText}`;
    }

    default: {
      return `Submitted ${dateText}`;
    }
  }
}

function createReviewDateText(review) {
  const date =
    review.status === collaborationReviewStatusMap.reviewed.value
      ? review.updatedDate
      : review.submittedDate;

  return createDateTextByStatus(date, review.status);
}

function CollaborationReviewPreviewBox(props) {
  const { review } = props;

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('CollaborationReviewView', {
      id: review.id,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusRow}>
        <Text
          style={[
            styles.statusLabel,
            { backgroundColor: getBackgroundLabelColorByStatus(review.status) },
          ]}
        >
          {getCollaborationReviewStatusLabel(review.status)}
        </Text>
        <Text style={styles.dateLabel}>{createReviewDateText(review)}</Text>
      </View>
      <View style={styles.detailsRow}>
        <Text style={styles.title}>{review.original.title}</Text>
        <Text style={styles.details} numberOfLines={3}>
          {review.original.details}
        </Text>
      </View>
      {review.status === collaborationReviewStatusMap.reviewed.value && (
        <TouchableOpacity style={styles.feedbackSection} onPress={handlePress}>
          <View style={styles.leftColumn}>
            <Text style={styles.feedbackTitle}>View Feedback</Text>
            <Text style={styles.reviewAuthor}>
              {`sent from ${review.author?.firstName} at ${review.author?.companyName}`}
            </Text>
          </View>
          <View style={styles.rightColumn}>
            <Icon name="ios-arrow-forward" size={20} color="#A1A6A6" />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default CollaborationReviewPreviewBox;
