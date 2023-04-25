import React from 'react';
import { useNavigation } from '@react-navigation/native';
// components
import CollaborationCreateThirdStep from 'src/modules/collaboration/containers/CollaborationCreateThirdStep';
// helpers
import { showLeaveAlert } from 'src/services/helpers';

function CollaborationCreateStepThree() {
  const navigation = useNavigation();

  const handleSubmit = () => {
    navigation.navigate('CollaborationCreateStepFourScreen');
  };

  const handleCancel = () => {
    showLeaveAlert({
      onLeave: () => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Newsfeed' }],
        });
      },
    });
  };

  return (
    <CollaborationCreateThirdStep
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}

export default CollaborationCreateStepThree;
