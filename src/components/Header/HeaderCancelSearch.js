import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
// components
import HeaderTextButton from 'src/components/Header/HeaderTextButton';
// actions
import { resetFilter } from 'src/actions/search';

function HeaderCancelSearch({}) {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  return (
    <HeaderTextButton
      onPress={() => {
        dispatch(resetFilter());
        navigation.navigate('CollaborationsList');
      }}
      title={'Cancel'}
    />
  );
}

export default HeaderCancelSearch;
