import React from 'react';
import { FlatList } from 'react-native';
// core components
import Spinner from '../Spinner';
import CollaborationBoxPreview from '../Collaboration/CollaborationBoxPreview';
import EmptyScreen from '../EmptyScreen';

export default class CollaborationsTab extends React.PureComponent {
  render() {
    const { isFetching, list } = this.props;

    return (
      <Spinner isFetching={isFetching} onCenter>
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <CollaborationBoxPreview collaboration={item} type={'favorite'} />
          )}
          keyExtractor={(collaboration) => collaboration._id}
          ListEmptyComponent={
            <EmptyScreen
              title={'No Favorite Partnerships'}
              text={
                'Check out the Newsfeed for partnerships to add to your favorites.'
              }
            />
          }
        />
      </Spinner>
    );
  }
}
