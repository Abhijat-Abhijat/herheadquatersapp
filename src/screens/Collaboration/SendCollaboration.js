import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
// containers
import SendCollaborationForm from 'src/modules/collaboration/containers/SendCollaborationForm';

function SendPartnersip({ route }) {
  const collaborationId = route?.params?.collaborationId;

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
      }}
    >
      <StatusBar backgroundColor="#02BAC2" barStyle="light-content" />
      <SendCollaborationForm collaborationId={collaborationId} />
    </ScrollView>
  );
}

export const screenOptions = {
  title: 'Send Partnership',
  headerStyle: {
    backgroundColor: '#02BAC2',
  },
  headerTindStyle: {
    color: '#ffffff',
  },
  headerTintColor: '#ffffff',
};

export default SendPartnersip;
