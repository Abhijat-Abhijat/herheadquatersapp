import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { destroy as reduxFormDestroy } from 'redux-form';
// components
import CollaborationCreateFirstStep from 'src/modules/collaboration/containers/CollaborationCreateFirstStep';
// utils
import { formName as collaborationFirstStepFormName } from 'src/modules/collaboration/containers/CollaborationCreateFirstStep';
import { formName as collaborationSecondStepFormName } from 'src/modules/collaboration/containers/CollaborationCreateSecondStep';
import { formName as collaborationThirdStepFormName } from 'src/modules/collaboration/containers/CollaborationCreateThirdStep';

function CollaborationCreateStepOne({ navigation }) {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    navigation.navigate('CollaborationCreateStepTwo');
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleLeave = useCallback(() => {
    dispatch(reduxFormDestroy(collaborationFirstStepFormName));
    dispatch(reduxFormDestroy(collaborationSecondStepFormName));
    dispatch(reduxFormDestroy(collaborationThirdStepFormName));
  }, []);

  return (
    <CollaborationCreateFirstStep
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onLeave={handleLeave}
    />
  );
}

export default CollaborationCreateStepOne;
