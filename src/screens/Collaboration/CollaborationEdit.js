import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// components
import Spinner from 'src/components/Spinner';
import CollaborationEditForm from 'src/modules/collaboration/containers/CollaborationEditForm';
// actions
import {
  getCollaborationRequest,
  clearCollaboration,
  updateCollaborationRequest,
} from 'src/actions/collaboration';
// selectors
import {
  getCurrentCollaboration,
  selectIsFetchingOneCollaboration,
} from 'src/selectors/collaboration';

function CollaborationEdit({ navigation, route }) {
  const idCollaboration = route.params?.idCollaboration;

  const isFetching = useSelector(selectIsFetchingOneCollaboration);
  const collaboration = useSelector(getCurrentCollaboration);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!idCollaboration) {
      dispatch(clearCollaboration);
    } else if (idCollaboration !== collaboration._id) {
      dispatch(getCollaborationRequest(idCollaboration));
    }
  }, [idCollaboration, collaboration._id, navigation, dispatch]);

  const onSubmit = (values) => {
    dispatch(updateCollaborationRequest(values));
  };

  const onCancel = () => {
    navigation.goBack();
  };

  return (
    <Spinner isFetching={isFetching} onCenter>
      <CollaborationEditForm
        initialValues={collaboration}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </Spinner>
  );
}

export const screenOptions = {
  title: 'Edit Partnership',
};

export default CollaborationEdit;
