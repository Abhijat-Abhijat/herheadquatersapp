import React from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
// components
import Spinner from 'src/components/Spinner';
import StaticProgressCircle from 'src/modules/core/components/StaticProgressCircle';
import Button from 'src/components/Buttons/Button';
// styles
import styles from './CollaborationCreateForthStep.styled';
import { primaryColor } from 'src/assets/jss/styles';

function CollaborationCreateForthStep(props) {
  const { onPostCollaboration, onPostReview, isSubmitting } = props;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <View>
          <StaticProgressCircle progress={4 / 4} text="4 of 4" />
        </View>
        <Text style={styles.title}>Partnership Review</Text>
      </View>
      <Text style={styles.infoTitle}>
        Secure your dream partner up to 70% faster!
      </Text>
      <Text style={styles.infoText}>
        Invite your partnership specialist to review your post and provide
        feedback. Benefit from a polished post that attracts many and leads to a
        successful brand partnership!
      </Text>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../../../assets/collaboration/postReview/collaborationReview.png')}
          style={styles.image}
        />
      </View>

      <Button
        type="secondary"
        styleButton={styles.skipReviewButton}
        onPress={onPostCollaboration}
        disabled={isSubmitting}
      >
        <Spinner isFetching={isSubmitting} color={primaryColor.main}>
          <Text style={[styles.buttonText, { color: primaryColor.main }]}>
            Skip Review and Post Partnership
          </Text>
        </Spinner>
      </Button>
      <Button
        type="orange"
        styleButton={styles.postReviewButton}
        onPress={onPostReview}
        disabled={isSubmitting}
      >
        <Spinner isFetching={isSubmitting} color="#fff">
          <Text style={[styles.buttonText, { color: '#fff' }]}>
            Submit Post for Free Review
          </Text>
        </Spinner>
      </Button>
    </ScrollView>
  );
}

export default CollaborationCreateForthStep;
