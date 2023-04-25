import React from 'react';
// components
import CollaborationCreateSecondStep from 'src/modules/collaboration/containers/CollaborationCreateSecondStep';
// helpers
import { showLeaveAlert } from 'src/services/helpers';

function CollaborationCreateStepTwo({ navigation }) {
  const handleSubmit = () => {
    navigation.navigate('CollaborationCreateStepThree');
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
    <CollaborationCreateSecondStep
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}

export default CollaborationCreateStepTwo;
