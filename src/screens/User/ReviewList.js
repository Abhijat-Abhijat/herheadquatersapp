import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, FlatList, StyleSheet } from 'react-native';
// core components
import UserBoxPreview from '../../components/User/UserBoxPreview';
import Spinner from '../../components/Spinner';
import Rating from '../../components/User/Rating';
import { lightBlueGrey } from '../../assets/jss/styles';
// actions
import { getUsersReviewsRequest } from '../../actions/review';
import {
  getListReview,
  getIsFetchingReview,
  getPaginationReview,
} from '../../selectors/review';
import { getCurrentUser } from '../../selectors/user';
import {
  GET_USERS_REVIEWS_MORE_REQUEST,
  GET_USERS_REVIEWS_REFRESH_REQUEST,
} from '../../actions/types';
import {
  criteriasMap,
  formatCollaborationDateToFull,
  getCriteriaKeys,
} from '../../actions/utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reviewContainer: {
    marginTop: 6,
  },
  contentContainer: {
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: lightBlueGrey,
  },
  title: {
    fontFamily: 'lato-bold',
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
    width: '80%',
  },
  simpleText: {
    lineHeight: 18,
    letterSpacing: 0,
  },
  label: {
    marginBottom: 1,
  },
  criteriaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  criteriaText: {
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: 0,
  },
  criteriasContainer: {
    marginTop: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
});

class ReviewList extends React.PureComponent {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.object),
    pagination: PropTypes.object,
    isFetching: PropTypes.shape({
      init: PropTypes.bool,
      update: PropTypes.bool,
    }),
    currentIdUser: PropTypes.string,
  };

  renderItem = ({ item }) => {
    if (!item.collaboration || !item.collaboration._id) {
      return null;
    }

    const criteriasKeys = getCriteriaKeys(item.criterias);

    return (
      <View style={styles.reviewContainer}>
        <UserBoxPreview
          user={item.from}
          displayActions={false}
          toProfile={false}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{item.collaboration.title}</Text>
          <View style={styles.dateContainer}>
            <View>
              <Text style={[styles.simpleText, styles.label]}>STARTED</Text>
              <Text style={styles.simpleText}>
                {formatCollaborationDateToFull(item.startDate)}
              </Text>
            </View>
            <View>
              <Text style={[styles.simpleText, styles.label]}>ENDED</Text>
              <Text style={styles.simpleText}>
                {formatCollaborationDateToFull(item.endDate)}
              </Text>
            </View>
          </View>
          <Text style={[styles.simpleText, styles.label]}>REVIEW</Text>
          <Text style={styles.simpleText}>{item.text}</Text>
          <View style={styles.criteriasContainer}>
            {criteriasKeys.map((criteria, index) => (
              <View key={index} style={styles.criteriaItem}>
                <Text style={styles.criteriaText}>
                  {criteriasMap[criteria]}
                </Text>
                <Rating
                  value={item.criterias[criteria]}
                  containerStyle={styles.ratingContainer}
                  size={15}
                />
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  onEndReached = () => {
    const { pagination, isFetching, currentIdUser } = this.props;

    if (pagination.canLoadMore && !isFetching.init && !isFetching.update) {
      this.props.dispatch(
        getUsersReviewsRequest(
          currentIdUser,
          pagination.page + 1,
          pagination.limit,
          GET_USERS_REVIEWS_MORE_REQUEST,
        ),
      );
    }
  };

  onRefresh = () => {
    const { pagination, isFetching, currentIdUser } = this.props;

    if (!isFetching.init && !isFetching.update) {
      this.props.dispatch(
        getUsersReviewsRequest(
          currentIdUser,
          0,
          pagination.limit,
          GET_USERS_REVIEWS_REFRESH_REQUEST,
        ),
      );
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
            keyExtractor={(review) => review._id}
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
  title: 'Reviews',
};

const mapStateToProps = (state) => ({
  isFetching: getIsFetchingReview(state),
  list: getListReview(state),
  pagination: getPaginationReview(state),
  currentIdUser: getCurrentUser(state)._id,
});

export default connect(mapStateToProps)(ReviewList);
