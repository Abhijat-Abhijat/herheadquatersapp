import React from 'react';
// containers
import FirstMessageForm from 'src/modules/chat/containers/FIrstMessageForm';

function FirstMessage({ route }) {
  const userId = route.params?.userId;

  return <FirstMessageForm userId={userId} />;
}

export const screenOptions = ({ route }) => {
  const name = route.params?.name;

  return {
    title: `Collaborate with ${name}`,
  };
};

export default FirstMessage;
