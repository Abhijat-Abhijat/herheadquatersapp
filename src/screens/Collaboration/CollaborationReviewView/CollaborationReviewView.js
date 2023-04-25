import React from 'react';
import { useCallback, useEffect } from 'react';
import { Text, View, ScrollView, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
// components
import CollaborationReviewForm from 'src/modules/collaborationReview/components/CollaborationReviewForm';
// actions
import { getCollaborationReviewRequest } from 'src/modules/collaborationReview/collaborationReview.actions';
// selectors
import {
  selectCollaborationReviewIsItemLoading,
  selectCollaborationReviewItem,
} from 'src/modules/collaborationReview/collaborationReview.selectors';
// styles
import styles from './CollaborationReviewView.styled';

function CollaborationReviewView({ route }) {
  const id = route?.params?.id;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const review = useSelector(selectCollaborationReviewItem);
  const isLoading = useSelector(selectCollaborationReviewIsItemLoading);

  const loadReview = useCallback(() => {
    dispatch(getCollaborationReviewRequest({ id }));
  }, [id]);

  const handleSuccess = () => {
    navigation.goBack();
  };

  useEffect(() => {
    loadReview();
  }, [id]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={loadReview} />
      }
    >
      {isLoading || !review ? (
        <View style={{ flex: 1, height: 100 }}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <CollaborationReviewForm
          initialValues={review}
          review={review}
          onSuccess={handleSuccess}
        />
      )}
    </ScrollView>
  );
}
export const screenOptions = {
  title: 'View Feedback',
};

export default CollaborationReviewView;
