import React from 'react';
import { View } from 'react-native';
// components
import SectionTitleRow from 'src/modules/core/components/SectionTitleRow';
import UserLightBoxPreview from 'src/components/User/UserLightBoxPreview';

function CollaborationViewAuthorSection({ author }) {
  return (
    <View>
      <SectionTitleRow title={'POSTED BY'} />
      <UserLightBoxPreview author={author} />
    </View>
  );
}

export default CollaborationViewAuthorSection;
