import React, { memo, useCallback, useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
// components
import EmptyScreen from 'src/components/EmptyScreen';
import PotentialPartnerPreviewBox from 'src/modules/user/containers/PotentialPartnerPreviewBox';
import PotentialPartnerPreviewCard from 'src/modules/user/containers/PotentialPartnerPreviewCard';
import CollaborationListPreview from 'src/modules/collaboration/containers/CollaborationListPreview';
import CollaborationPreviewCard from 'src/modules/collaboration/containers/CollaborationPreviewCard';
// utils
import { prepareList, rowTitleMap } from './NewsfeedList.utils';
// styles
import styles from './NewsfeedList.styled';

function NewsfeedList(props) {
  const {
    collaborationList,
    potentialPartnerList,
    onEndReached,
    onRefresh,
    isRefreshing,
    listType,
  } = props;

  const renderItem = useCallback(
    ({ item }) => {
      // if collaboration
      if (item.type === 'collaboration') {
        return <CollaborationListPreview collaboration={item.item} />;
      }

      // if potential partner
      if (item.type === 'potentialPartner') {
        return (
          <PotentialPartnerPreviewBox
            userId={item.item._id}
            onRefresh={onRefresh}
          />
        );
      }

      if (item.type === 'list') {
        const list = item.item;

        return (
          <View style={styles.listRowContainer}>
            <Text style={styles.rowListTitle}>{rowTitleMap[listType]}</Text>
            <FlatList
              style={styles.rowList}
              data={list}
              keyExtractor={(data) => data.id}
              renderItem={({ item, index }) => {
                let cardStyle = Object.assign({}, styles.card);

                if (index === 0) {
                  Object.assign(cardStyle, styles.firstCard);
                }

                if (index === list.length - 1) {
                  Object.assign(cardStyle, styles.lastCard);
                }

                if (item.type === 'collaboration') {
                  return (
                    <CollaborationPreviewCard
                      style={cardStyle}
                      collaboration={item.item}
                    />
                  );
                }

                if (item.type === 'potentialPartner') {
                  return (
                    <PotentialPartnerPreviewCard
                      style={cardStyle}
                      partner={item.item}
                    />
                  );
                }

                return null;
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        );
      }

      if (item.type === 'emptyCollaboration') {
        return (
          <EmptyScreen
            title={'No Partnerships'}
            text={'No available partnerships that match your preferences.'}
            iconName={'ios-search'}
          />
        );
      }

      if (item.type === 'emptyPotentialPartner') {
        return (
          <EmptyScreen
            title={'No Potential Partners'}
            text={
              'No available potential partners that match your preferences.'
            }
            iconName={'ios-search'}
          />
        );
      }

      return null;
    },
    [onRefresh, listType],
  );

  const data = useMemo(
    () => prepareList(collaborationList, potentialPartnerList, listType),
    [collaborationList, potentialPartnerList, listType],
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(data) => data.id}
      onEndReached={onEndReached}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
    />
  );
}

export default memo(NewsfeedList);
