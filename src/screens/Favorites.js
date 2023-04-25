import React from 'react';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
// core components
import ProfilesTab from 'src/components/Favorites/ProfilesTab';
import CollaborationsTab from 'src/components/Favorites/CollaborationsTab';
import TabBar from 'src/components/Favorites/TabBar';
// actions
import { getProfileRequest } from 'src/actions/user';
// selectors
import { getIsFetchingProfile, getFavorites } from 'src/selectors/user';

class Favorites extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'collaborations', title: 'Partnerships' },
      { key: 'profiles', title: 'Potential Partners' },
    ],
  };

  renderScene = ({ route, jumpTo }) => {
    const { isFetching, favoritesProfiles, favoritesCollaborations } =
      this.props;

    switch (route.key) {
      case 'profiles':
        return (
          <ProfilesTab
            jumpTo={jumpTo}
            isFetching={isFetching}
            list={favoritesProfiles}
          />
        );
      case 'collaborations':
        return (
          <CollaborationsTab
            jumpTo={jumpTo}
            isFetching={isFetching}
            list={favoritesCollaborations}
          />
        );
    }
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.props.dispatch(
        getProfileRequest(
          [
            {
              path: 'favorites.profiles',
              populate: {
                path: 'avatar',
              },
            },
            {
              path: 'favorites.collaborations',
              populate: [
                {
                  path: 'author',
                  populate: { path: 'avatar' },
                },
              ],
            },
          ],
          ['_id', 'favorites'],
        ),
      );
    });
  }

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this.renderScene}
        onIndexChange={(index) => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={(props) => <TabBar {...props} />}
      />
    );
  }
}

export const screenOptions = {
  title: 'Favorites',
};

const mapStateToProps = (state) => ({
  isFetching: getIsFetchingProfile(state),
  favoritesProfiles: getFavorites(state).profiles,
  favoritesCollaborations: getFavorites(state).collaborations,
});

export default connect(mapStateToProps)(Favorites);
