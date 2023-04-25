import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, FlatList } from 'react-native';
// core components
import Spinner from '../../components/Spinner';
import CollaborationBoxPreview from '../../components/Collaboration/CollaborationBoxPreview';
// actions
import { getUserCollaborationsRequest } from '../../actions/collaboration';
import {
  getIsFetchingUserCollaboration,
  getListUserCollaboration,
  getPaginationUserCollaboration,
} from '../../selectors/userCollaboration';
// types
import {
  GET_USER_COLLABORATIONS_REFRESH_REQUEST,
  GET_USER_COLLABORATIONS_MORE_REQUEST,
} from '../../actions/types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 9,
    paddingBottom: 11,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class UserCollaborationsList extends React.PureComponent {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.object),
    pagination: PropTypes.object,
    isFetching: PropTypes.shape({
      init: PropTypes.bool,
      update: PropTypes.bool,
    }),
  };

  renderItem = ({ item }) => {
    return <CollaborationBoxPreview collaboration={item} />;
  };

  onEndReached = () => {
    const { pagination, isFetching, route, dispatch } = this.props;

    const idUser = route.params?.idUser;

    if (pagination.canLoadMore && !isFetching.init && !isFetching.update) {
      dispatch(
        getUserCollaborationsRequest(
          idUser,
          pagination.page + 1,
          pagination.limit,
          GET_USER_COLLABORATIONS_MORE_REQUEST,
        ),
      );
    }
  };

  onRefresh = () => {
    const { pagination, isFetching, route, dispatch } = this.props;

    const idUser = route.params?.idUser;

    if (!isFetching.init && !isFetching.update) {
      dispatch(
        getUserCollaborationsRequest(
          idUser,
          0,
          pagination.limit,
          GET_USER_COLLABORATIONS_REFRESH_REQUEST,
        ),
      );
    }
  };

  ListEmpty = () => {
    return (
      <View style={styles.emptyList}>
        <Text>This user does not have any partnership right now!</Text>
      </View>
    );
  };

  componentDidMount() {
    this.unsubscribeFocusListener = this.props.navigation.addListener(
      'focus',
      () => {
        const { navigation, route, dispatch } = this.props;

        const idUser = route.params?.idUser;

        if (!idUser) {
          navigation.goBack();
        }

        dispatch(getUserCollaborationsRequest(idUser));
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
            keyExtractor={(collaboration) => collaboration._id}
            onEndReached={this.onEndReached}
            onRefresh={this.onRefresh}
            refreshing={isFetching.update}
            ListEmptyComponent={this.ListEmpty}
          />
        </Spinner>
      </View>
    );
  }
}

export const screenOptions = {
  title: 'User Partnership List',
};

const mapStateToProps = (state) => ({
  list: getListUserCollaboration(state),
  pagination: getPaginationUserCollaboration(state),
  isFetching: getIsFetchingUserCollaboration(state),
});

export default connect(mapStateToProps)(UserCollaborationsList);
