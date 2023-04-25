import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
// core components
import ChatPreview from '../../components/Chat/ChatPreview';
import Spinner from '../../components/Spinner';
import EmptyScreen from '../../components/EmptyScreen';
// actions
import { getChatsRequest, updateChat } from '../../actions/chat';
import {
  getListChat,
  getIsFetchingChat,
  getPaginationChat,
} from '../../selectors/chat';
import { getProfile } from '../../selectors/user';
// types
import {
  GET_CHATS_REFRESH_REQUEST,
  GET_CHATS_MORE_REQUEST,
} from '../../actions/types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class ChatList extends React.Component {
  static propTypes = {
    myId: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.object),
    pagination: PropTypes.object,
    isFetching: PropTypes.shape({
      init: PropTypes.bool,
      update: PropTypes.bool,
    }),
  };

  renderItem = ({ item }) => {
    const corresponder = item.participants.find(
      (user) => user._id !== this.props.myId,
    );
    const name = corresponder.firstName + ' ' + corresponder.lastName;
    const title = item.subject || name;

    return (
      <TouchableOpacity onPress={() => this.onPress(item, title, name)}>
        <ChatPreview
          id={item._id}
          myId={this.props.myId}
          subject={item.subject}
          corresponder={corresponder}
          message={item.lastMessage}
        />
      </TouchableOpacity>
    );
  };

  onEndReached = () => {
    const { pagination, isFetching } = this.props;

    if (pagination.canLoadMore && !isFetching.init && !isFetching.update) {
      this.props.dispatch(
        getChatsRequest(
          pagination.page + 1,
          pagination.limit,
          GET_CHATS_MORE_REQUEST,
        ),
      );
    }
  };

  onRefresh = () => {
    const { pagination, isFetching } = this.props;

    if (!isFetching.init && !isFetching.update) {
      this.props.dispatch(
        getChatsRequest(0, pagination.limit, GET_CHATS_REFRESH_REQUEST),
      );
    }
  };

  onPress = (chat, title, name) => {
    this.props.dispatch(updateChat(chat));
    this.props.navigation.navigate('ChatView', {
      title,
      corresponderName: name,
    });
  };

  componentDidMount() {
    this.unsubscribeFocusListener = this.props.navigation.addListener(
      'focus',
      () => {
        this.props.dispatch(getChatsRequest());
      },
    );
  }

  componentWillUnmount = () => {
    if (this.unsubscribeFocusListener) {
      this.unsubscribeFocusListener();
    }
  };

  render() {
    const { list, isFetching } = this.props;

    return (
      <View style={styles.container}>
        <Spinner isFetching={isFetching.init} onCenter>
          <FlatList
            data={list}
            renderItem={this.renderItem}
            keyExtractor={(chat) => chat._id}
            onEndReached={this.onEndReached}
            onRefresh={this.onRefresh}
            refreshing={isFetching.update}
            ListEmptyComponent={
              <EmptyScreen
                title={'No Chats'}
                text={'No available chats that match your preferences.'}
                iconName={'ios-search'}
              />
            }
          />
        </Spinner>
      </View>
    );
  }
}

export const screenOptions = {
  title: 'Messages',
};

const mapStateToProps = (state) => ({
  myId: getProfile(state)._id,
  list: getListChat(state),
  pagination: getPaginationChat(state),
  isFetching: getIsFetchingChat(state),
});

export default connect(mapStateToProps)(ChatList);
