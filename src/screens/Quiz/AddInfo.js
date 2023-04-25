import React from 'react';
import { useSelector } from 'react-redux';
// containers
import AddInfoContainer from 'src/components/Quiz/AddInfo/AddInfoContainer';
// selectors
import { selectAvatar, selectAboutCompany } from 'src/selectors/user';

function AddInfo() {
  const initialValues = useSelector((state) => {
    return {
      avatar: selectAvatar(state),
      aboutCompany: selectAboutCompany(state),
    };
  });

  return <AddInfoContainer initialValues={initialValues} />;
}

export const screenOptions = {
  title: 'Step 1/2 - Profile photo & About company',
};

export default AddInfo;
