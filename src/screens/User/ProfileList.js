import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, StyleSheet, FlatList } from 'react-native';
import qs from 'querystring';
// core components
import Spinner from '../../components/Spinner';
import UserBoxPreview from '../../components/User/UserBoxPreview';
import HeaderCancelSearch from '../../components/Header/HeaderCancelSearch';
import SearchHeader from '../../components/Header/SearchHeader';
// actions
import { getUsersRequest } from '../../actions/user';
import {
  getIsFetchingUser,
  getListUsers,
  getPaginationUser,
} from '../../selectors/user';
// types
import {
  GET_USERS_REQUEST,
  GET_USERS_REFRESH_REQUEST,
  GET_USERS_MORE_REQUEST,
} from '../../actions/types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

class ProfileList extends React.PureComponent {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.object),
    pagination: PropTypes.object,
    isFetching: PropTypes.shape({
      init: PropTypes.bool,
      update: PropTypes.bool,
    }),
  };

  renderItem = ({ item }) => {
    return <UserBoxPreview user={item} />;
  };

  onEndReached = () => {
    const { pagination, isFetching, route } = this.props;

    const q = route.params?.query;

    if (pagination.canLoadMore && !isFetching.init && !isFetching.update) {
      this.props.dispatch(
        getUsersRequest(
          pagination.page + 1,
          pagination.limit,
          qs.parse(q),
          GET_USERS_MORE_REQUEST,
        ),
      );
    }
  };

  onRefresh = () => {
    const { pagination, isFetching, route } = this.props;

    const q = route.params?.query;

    if (!isFetching.init && !isFetching.update) {
      this.props.dispatch(
        getUsersRequest(
          0,
          pagination.limit,
          qs.parse(q),
          GET_USERS_REFRESH_REQUEST,
        ),
      );
    }
  };

  componentDidMount() {
    this.unsubscribeFocusListener = this.props.navigation.addListener(
      'focus',
      () => {
        const { pagination, route, dispatch } = this.props;

        const q = route.params?.query;

        dispatch(
          getUsersRequest(0, pagination.limit, qs.parse(q), GET_USERS_REQUEST),
        );
      },
    );
  }

  componentWillUnmount = () => {
    if (this.unsubscribeFocusListener) {
      this.unsubscribeFocusListener();
    }
  };

  render() {
    const { isFetching, list } = this.props;

    return (
      <View style={styles.container}>
        <Spinner isFetching={isFetching.init} onCenter>
          <FlatList
            data={list}
            renderItem={this.renderItem}
            keyExtractor={(user) => user._id}
            onEndReached={this.onEndReached}
            onRefresh={this.onRefresh}
            refreshing={isFetching.update}
          />
        </Spinner>
      </View>
    );
  }
}

export const screenOptions = {
  headerTitle: () => <SearchHeader />,
  headerRight: () => <HeaderCancelSearch />,
};

const mapStateToProps = (state) => ({
  list: getListUsers(state),
  pagination: getPaginationUser(state),
  isFetching: getIsFetchingUser(state),
});

export default connect(mapStateToProps)(ProfileList);
