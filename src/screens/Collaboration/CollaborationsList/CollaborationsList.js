import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import qs from 'querystring';
import { View, Dimensions, StatusBar } from 'react-native';
import { TabView } from 'react-native-tab-view';
// core components
import TabBar from 'src/components/Favorites/TabBar';
import SearchHeader from 'src/components/Header/SearchHeader';
import HeaderCancelSearch from 'src/components/Header/HeaderCancelSearch';
import NewsfeedList from 'src/modules/collaboration/containers/NewsfeedList';
// icons
import PlusCircleOutlineIcon from 'src/components/Icons/PlusCircleOutlineIcon';
// actions
import { getCollaborationsRequest } from 'src/actions/collaboration';
import { changeSearchText } from 'src/actions/search';
import { getPotentialPartnersRequest } from 'src/modules/user/actions';
// selectors
import {
  getIsFetchingCollaboration,
  getListCollaboration,
  getPaginationCollaboration,
} from 'src/selectors/collaboration';
import {
  selectPotentialPartnersList,
  selectPotentialPartnersLoading,
  selectPotentialPartnersPagination,
} from 'src/modules/user/selectors';
// types
import {
  GET_COLLABORATIONS_REQUEST,
  GET_COLLABORATIONS_REFRESH_REQUEST,
  GET_COLLABORATIONS_MORE_REQUEST,
} from 'src/actions/types';
import {
  GET_POTENTIAL_PARTNERS_REFRESH_REQUEST,
  GET_POTENTIAL_PARTNERS_MORE_REQUEST,
} from 'src/modules/user/types';
// styles
import { orangeColor, primaryColor } from 'src/assets/jss/styles';
import styles from './CollaborationsList.styled';

class CollaborationsList extends React.PureComponent {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.object),
    collaborationsPagination: PropTypes.object,
    isCollaborationsFetching: PropTypes.shape({
      init: PropTypes.bool,
      update: PropTypes.bool,
    }),
    isPotentialPartnersFetching: PropTypes.bool,
    potentialPartnersList: PropTypes.arrayOf(PropTypes.object),
    potentialPartnersPagination: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: 'collaborationTab', title: 'Partnerships' },
        { key: 'potentialPartnerTab', title: 'Potential Partners' },
      ],
    };
  }

  componentDidMount() {
    this.unsubscribeFocusListener = this.props.navigation.addListener(
      'focus',
      () => {
        this.isFocused = true;

        const { dispatch, route } = this.props;

        const q = route.params?.query;

        dispatch(changeSearchText(''));
        dispatch(
          getCollaborationsRequest(
            0,
            undefined,
            qs.parse(q),
            GET_COLLABORATIONS_REQUEST,
          ),
        );
        dispatch(getPotentialPartnersRequest(0));
      },
    );

    this.unsubscribeBlurListener = this.props.navigation.addListener(
      'blur',
      () => {
        this.isFocused = false;
      },
    );
  }

  componentWillUnmount = () => {
    if (this.unsubscribeFocusListener) {
      this.unsubscribeFocusListener();
    }

    if (this.unsubscribeBlurListener) {
      this.unsubscribeBlurListener();
    }
  };

  onEndReached = () => {
    const {
      collaborationsPagination,
      isCollaborationsFetching,
      potentialPartnersPagination,
      isPotentialPartnersFetching,
      route,
    } = this.props;

    if (!this.isFocused) {
      return;
    }

    const q = route.params?.query;

    if (
      collaborationsPagination.canLoadMore &&
      !isCollaborationsFetching.init &&
      !isCollaborationsFetching.update
    ) {
      this.props.dispatch(
        getCollaborationsRequest(
          collaborationsPagination.page + 1,
          collaborationsPagination.limit,
          qs.parse(q),
          GET_COLLABORATIONS_MORE_REQUEST,
        ),
      );
    }

    if (
      potentialPartnersPagination.canLoadMore &&
      !isPotentialPartnersFetching
    ) {
      this.props.dispatch(
        getPotentialPartnersRequest(
          potentialPartnersPagination.page + 1,
          potentialPartnersPagination.limit,
          GET_POTENTIAL_PARTNERS_MORE_REQUEST,
        ),
      );
    }
  };

  onRefresh = () => {
    const {
      collaborationsPagination,
      isCollaborationsFetching,
      potentialPartnersPagination,
      isPotentialPartnersFetching,
      route,
    } = this.props;

    const q = route.params?.query;

    if (!isCollaborationsFetching.init && !isCollaborationsFetching.update) {
      this.props.dispatch(
        getCollaborationsRequest(
          0,
          collaborationsPagination.limit,
          qs.parse(q),
          GET_COLLABORATIONS_REFRESH_REQUEST,
        ),
      );
    }

    if (!isPotentialPartnersFetching) {
      this.props.dispatch(
        getPotentialPartnersRequest(
          0,
          potentialPartnersPagination.limit,
          GET_POTENTIAL_PARTNERS_REFRESH_REQUEST,
        ),
      );
    }
  };

  handleClickAddCollaboration = () => {
    this.props.navigation.navigate('CollaborationCreate');
  };

  renderScene = ({ route }) => {
    const {
      isCollaborationsFetching,
      isPotentialPartnersFetching,
      list,
      potentialPartnersList,
    } = this.props;

    const listType = route.key;

    return (
      <NewsfeedList
        collaborationList={list}
        potentialPartnerList={potentialPartnersList}
        onEndReached={this.onEndReached}
        onRefresh={this.onRefresh}
        isRefreshing={
          isCollaborationsFetching.update || isPotentialPartnersFetching
        }
        listType={listType}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={primaryColor.main}
          barStyle="dark-content"
        />
        <TabView
          navigationState={{
            index: this.state.index,
            routes: this.state.routes,
          }}
          renderScene={this.renderScene}
          onIndexChange={(index) => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={(props) => <TabBar {...props} />}
          swipeEnabled={false}
        />
        <View style={styles.iconContainer}>
          <PlusCircleOutlineIcon
            containerColor={orangeColor}
            onPress={this.handleClickAddCollaboration}
          />
        </View>
      </View>
    );
  }
}

export const screenOptions = ({ route }) => {
  const isMain = !route.params?.query;

  return {
    headerRight: () => (isMain ? <View /> : <HeaderCancelSearch />),
    headerLeft: () => (isMain ? <View /> : undefined),
    headerTitle: () => <SearchHeader />,
  };
};

const mapStateToProps = (state) => ({
  list: getListCollaboration(state),
  collaborationsPagination: getPaginationCollaboration(state),
  isCollaborationsFetching: getIsFetchingCollaboration(state),
  isPotentialPartnersFetching: selectPotentialPartnersLoading(state),
  potentialPartnersList: selectPotentialPartnersList(state),
  potentialPartnersPagination: selectPotentialPartnersPagination(state),
});

export default connect(mapStateToProps)(CollaborationsList);
