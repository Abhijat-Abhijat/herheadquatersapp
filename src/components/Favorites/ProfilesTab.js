import React from 'react';
import { FlatList } from 'react-native';
// core components
import Spinner from '../Spinner';
import UserBoxPreview from '../User/UserBoxPreview';
import EmptyScreen from '../EmptyScreen';

export default class ProfilesTab extends React.PureComponent {
  render() {
    const { isFetching, list } = this.props;

    return (
      <Spinner isFetching={isFetching} onCenter>
        <FlatList
          data={list}
          renderItem={({ item }) => <UserBoxPreview user={item} />}
          keyExtractor={(user) => user._id || Math.random().toString()}
          ListEmptyComponent={
            <EmptyScreen
              title={'No Favorite Profiles'}
              text={
                'Check out the Newsfeed for people you’d like to collaborate with.'
              }
            />
          }
        />
      </Spinner>
    );
  }
}
