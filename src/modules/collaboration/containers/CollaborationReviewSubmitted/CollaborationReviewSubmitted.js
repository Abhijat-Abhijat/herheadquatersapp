import React from 'react';
import { ScrollView, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// components
import Button from 'src/components/Buttons/Button';
// styles
import styles from './CollaborationReviewSubmitted.styled';
import { primaryColor } from 'src/assets/jss/styles';

function CollaborationReviewSubmitted() {
  const navigation = useNavigation();

  const handleUpgradeClick = () => {
    navigation.navigate('UpdateToPremium');
  };

  const handleNewsfeedClick = () => {
    navigation.reset({ index: 0, routes: [{ name: 'CollaborationsList' }] });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Post Submitted for Review</Text>
      <Image
        source={require('../../../../../assets/collaboration/reviewSubmitted/reviewSubmitted.png')}
        style={styles.image}
      />
      <Text style={styles.text}>
        We'll be reviewing your post soon! While premium member submissions
        receive priority review, most members will receive feedback within 3-4
        business days. You can check the status of your submitted post in the
        Partnerships section.
      </Text>
      <Button
        type="secondary"
        styleButton={styles.upgradeButton}
        onPress={handleUpgradeClick}
      >
        <Text style={[styles.buttonText, { color: primaryColor.main }]}>
          Upgrade to Premium
        </Text>
      </Button>
      <Button
        type="orange"
        styleButton={styles.newsfeedButton}
        onPress={handleNewsfeedClick}
      >
        <Text style={[styles.buttonText, { color: '#fff' }]}>
          View Newsfeed
        </Text>
      </Button>
    </ScrollView>
  );
}

export default CollaborationReviewSubmitted;
