import React from 'react';
import { useSelector } from 'react-redux';
// containers
import AddPreferencesContainer from 'src/components/Quiz/AddPreferences/AddPreferencesContainer';
// selectors
import { selectQuiz } from 'src/selectors/user';

function AddPreferences() {
  const { isFirstTime, ...quiz } = useSelector(selectQuiz);

  return <AddPreferencesContainer initialValues={quiz} />;
}

export const screenOptions = ({ route }) => {
  return {
    title: route.params?.title || 'Step 2/2 - Partnership Preferences',
  };
};

export default AddPreferences;
