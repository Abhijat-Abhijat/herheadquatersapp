import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
// components
import CollaborationCreateForthStep from 'src/modules/collaboration/containers/CollaborationCreateForthStep';
// actions
import { createCollaborationRequest } from 'src/actions/collaboration';
// selectors
import { selectIsSubmittingCollaboration } from 'src/selectors/collaboration';

function CollaborationCreateStepFour() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const isSubmitting = useSelector(selectIsSubmittingCollaboration);

  const handlePostCollaboration = useCallback(() => {
    const onSuccess = () => {
      navigation.reset({ index: 0, routes: [{ name: 'CollaborationsList' }] });
    };

    dispatch(createCollaborationRequest(false, onSuccess));
  }, [navigation]);

  const handlePostReview = useCallback(() => {
    const onSuccess = () => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'CollaborationCreateReviewSubmittedScreen' }],
      });
    };

    dispatch(createCollaborationRequest(true, onSuccess));
  }, [navigation]);

  return (
    <CollaborationCreateForthStep
      onPostCollaboration={handlePostCollaboration}
      onPostReview={handlePostReview}
      isSubmitting={isSubmitting}
    />
  );
}

export default CollaborationCreateStepFour;
