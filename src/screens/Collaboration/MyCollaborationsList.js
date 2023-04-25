import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
// core components
import Spinner from '../../components/Spinner';
import Button from '../../components/Buttons/Button';
import RequestBox from '../../components/Request/RequestBox';
import Section from '../../components/Collaboration/Section';
import MyCollaborationBoxPreview from '../../components/Collaboration/MyCollaborationBoxPreview';
import CollaborationReviewPreviewBox from 'src/modules/collaborationReview/components/CollaborationReviewPreviewBox';
// actions
import { getRequestsRequest } from '../../actions/request';
import {
  getIsFetchingRequest,
  getIncomingListRequest,
  getPaginationRequest,
  getOutgoingListRequest,
} from '../../selectors/request';
import { getMyCollaborationsRequest } from '../../actions/collaboration';
import { GET_MY_COLLABORATIONS_MORE_REQUEST } from '../../actions/types';
import { getCollaborationReviewListRequest } from 'src/modules/collaborationReview/collaborationReview.actions';
// selectors
import {
  getListMyCollaborationActive,
  getListMyCollaborationInProgress,
  selectMyCollaborationToRateList,
  selectMyCollaborationCompletedRatedList,
  getIsFetchingMyCollaboration,
} from '../../selectors/myCollaboration';
import {
  selectCollaborationReviewIsListLoading,
  selectCollaborationReviewList,
  selectCollaborationReviewListParams,
  selectCollaborationReviewListTotal,
} from 'src/modules/collaborationReview/collaborationReview.selectors';

const styles = StyleSheet.create({
  text: {
    lineHeight: 40,
    letterSpacing: 0,
    marginTop: 5,
    marginBottom: 13,
    textAlign: 'center',
  },
  bigButton: {
    marginBottom: 44,
  },
  bigButtonText: {
    color: '#fff',
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
  },
  buttonPadding: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  spinnerPadding: {
    paddingTop: 30,
    paddingBottom: 30,
  },
});

class MyCollaborationsList extends React.Component {
  getData = () => {
    const { dispatch, collaborationReview } = this.props;

    dispatch(getCollaborationReviewListRequest(collaborationReview.params));
    dispatch(getRequestsRequest());
    dispatch(
      getRequestsRequest(
        undefined,
        undefined,
        'outgoing',
        undefined,
        undefined,
        [
          {
            path: 'collaboration',
            select: '_id title startDate',
            populate: {
              path: 'author',
              select: '_id firstName lastName companyName city state',
              populate: { path: 'avatar' },
            },
          },
        ],
      ),
    );
    dispatch(
      getMyCollaborationsRequest(
        undefined,
        undefined,
        {
          status: 'active',
        },
        GET_MY_COLLABORATIONS_MORE_REQUEST,
      ),
    );
    dispatch(
      getMyCollaborationsRequest(
        undefined,
        undefined,
        {
          status: 'progress',
        },
        GET_MY_COLLABORATIONS_MORE_REQUEST,
      ),
    );
    dispatch(
      getMyCollaborationsRequest(
        undefined,
        undefined,
        {
          status: 'expired',
        },
        GET_MY_COLLABORATIONS_MORE_REQUEST,
      ),
    );
    dispatch(
      getMyCollaborationsRequest(
        undefined,
        undefined,
        {
          status: 'completed',
        },
        GET_MY_COLLABORATIONS_MORE_REQUEST,
      ),
    );
  };

  onRefresh = () => {
    this.getData();
  };

  componentDidMount() {
    this.unsubscribeFocusListener = this.props.navigation.addListener(
      'focus',
      () => {
        this.getData();
      },
    );
  }

  componentWillUnmount = () => {
    if (this.unsubscribeFocusListener) {
      this.unsubscribeFocusListener();
    }
  };

  render() {
    const { request, collaboration, collaborationReview } = this.props;

    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
        }
      >
        <Section
          title={`PARTNERSHIPS UNDER REVIEW (${collaborationReview.listTotal})`}
          style={
            collaborationReview.list.length === 0
              ? { backgroundColor: '#fff' }
              : { backgroundColor: '#EFEFF4' }
          }
        >
          <Spinner
            isFetching={collaborationReview.isListLoading}
            containerStyle={styles.spinnerPadding}
          >
            {collaborationReview.list.length === 0 ? (
              <React.Fragment>
                <Text style={styles.text}>
                  No partnerships sent for review right now.
                  {'\n'}
                  Why don’t you post a new partnership?
                </Text>
                <View style={styles.buttonPadding}>
                  <Button
                    styleButton={styles.bigButton}
                    onPress={() => this.props.navigation.navigate('Newsfeed')}
                  >
                    <Text style={styles.bigButtonText}>
                      Post New Partnership
                    </Text>
                  </Button>
                </View>
              </React.Fragment>
            ) : (
              collaborationReview.list.map((review) => (
                <CollaborationReviewPreviewBox
                  key={review.id}
                  review={review}
                />
              ))
            )}
          </Spinner>
        </Section>
        <Section
          title={'YOUR REQUESTS'}
          style={
            request.listOutgoing.length === 0 ? { backgroundColor: '#fff' } : {}
          }
        >
          <Spinner
            isFetching={request.init || request.changeStatus}
            containerStyle={styles.spinnerPadding}
          >
            {request.listOutgoing.length === 0 ? (
              <React.Fragment>
                <Text style={styles.text}>
                  No requests to join partnerships right now.
                  {'\n'}
                  Why don’t you check out partnerships near you?
                </Text>
                <View style={styles.buttonPadding}>
                  <Button
                    styleButton={styles.bigButton}
                    onPress={() => this.props.navigation.navigate('Newsfeed')}
                  >
                    <Text style={styles.bigButtonText}>View Newsfeed</Text>
                  </Button>
                </View>
              </React.Fragment>
            ) : (
              request.listOutgoing.map((requestItem) => (
                <RequestBox
                  request={requestItem}
                  key={requestItem._id}
                  type={'outgoing'}
                />
              ))
            )}
          </Spinner>
        </Section>
        <Section
          title={'OPEN'}
          style={
            collaboration.listActive.length === 0
              ? { backgroundColor: '#fff' }
              : {}
          }
        >
          <Spinner
            isFetching={
              collaboration.isFetching.init || collaboration.isFetching.update
            }
            containerStyle={styles.spinnerPadding}
          >
            {collaboration.listActive.length === 0 ? (
              <React.Fragment>
                <Text style={styles.text}>
                  No open partnerships right now.
                  {`\n`}
                  Why don’t you post a new partnership?
                </Text>
                <View style={styles.buttonPadding}>
                  <Button
                    styleButton={styles.bigButton}
                    onPress={() => {
                      this.props.navigation.navigate('CollaborationCreate');
                    }}
                  >
                    <Text style={styles.bigButtonText}>
                      Post New Partnership
                    </Text>
                  </Button>
                </View>
              </React.Fragment>
            ) : (
              collaboration.listActive.map((collaboration) => (
                <MyCollaborationBoxPreview
                  key={collaboration._id}
                  collaboration={collaboration}
                  type={'open'}
                />
              ))
            )}
          </Spinner>
        </Section>
        <Section
          title={'NEEDS REVIEW'}
          style={
            request.listIncoming.length === 0 ? { backgroundColor: '#fff' } : {}
          }
        >
          <Spinner
            isFetching={request.init || request.changeStatus}
            containerStyle={styles.spinnerPadding}
          >
            {request.listIncoming.length === 0 ? (
              <Text style={styles.text}>
                No potential collaborators to review right now.{`\n`}
                You’re on top of it!
              </Text>
            ) : (
              request.listIncoming.map((requestItem) => (
                <RequestBox
                  request={requestItem}
                  key={requestItem._id}
                  type={'incoming'}
                />
              ))
            )}
          </Spinner>
        </Section>
        <Section
          title={'IN PROGRESS'}
          style={
            collaboration.listInProgress.length === 0
              ? { backgroundColor: '#fff' }
              : {}
          }
        >
          <Spinner
            isFetching={
              collaboration.isFetching.init || collaboration.isFetching.update
            }
            containerStyle={styles.spinnerPadding}
          >
            {collaboration.listInProgress.length === 0 ? (
              <React.Fragment>
                <Text style={styles.text}>
                  No partnerships in progress right now.
                  {`\n`}
                  Why don’t you check out partnerships near you?
                </Text>
                <View style={styles.buttonPadding}>
                  <Button
                    styleButton={styles.bigButton}
                    onPress={() => this.props.navigation.navigate('Newsfeed')}
                  >
                    <Text style={styles.bigButtonText}>View Newsfeed</Text>
                  </Button>
                </View>
              </React.Fragment>
            ) : (
              collaboration.listInProgress.map((collaboration) => (
                <MyCollaborationBoxPreview
                  key={collaboration._id}
                  collaboration={collaboration}
                />
              ))
            )}
          </Spinner>
        </Section>
        <Section
          title={'TO RATE'}
          style={
            collaboration.listToRate.length === 0
              ? { backgroundColor: '#fff' }
              : {}
          }
        >
          <Spinner
            isFetching={
              collaboration.isFetching.init || collaboration.isFetching.update
            }
            containerStyle={styles.spinnerPadding}
          >
            {collaboration.listToRate.length === 0 ? (
              <Text style={styles.text}>
                No partnerships to rate right now.
                {`\n`}
                You’re on top of it!
              </Text>
            ) : (
              collaboration.listToRate.map((collaboration) => (
                <MyCollaborationBoxPreview
                  key={collaboration._id}
                  collaboration={collaboration}
                  type={'rate'}
                />
              ))
            )}
          </Spinner>
        </Section>
        <Section
          title={'COMPLETED'}
          style={
            collaboration.listRatedCompleted.length === 0
              ? { backgroundColor: '#fff' }
              : {}
          }
        >
          <Spinner
            isFetching={
              collaboration.isFetching.init || collaboration.isFetching.update
            }
            containerStyle={styles.spinnerPadding}
          >
            {collaboration.listRatedCompleted.length === 0 ? (
              <Text style={styles.text}>
                No expired partnerships right now.
                {`\n`}
                You’re on top of it!
              </Text>
            ) : (
              collaboration.listRatedCompleted.map((collaboration) => (
                <MyCollaborationBoxPreview
                  key={collaboration._id}
                  collaboration={collaboration}
                  type={'completed'}
                />
              ))
            )}
          </Spinner>
        </Section>
      </ScrollView>
    );
  }
}

export const screenOptions = {
  title: 'Collaborations',
};

const mapStateToProps = (state) => ({
  request: {
    init: getIsFetchingRequest(state).init,
    update: getIsFetchingRequest(state).update,
    changeStatus: getIsFetchingRequest(state).changeStatus,
    listIncoming: getIncomingListRequest(state),
    listOutgoing: getOutgoingListRequest(state),
    pagination: getPaginationRequest(state),
  },
  collaboration: {
    listActive: getListMyCollaborationActive(state),
    listInProgress: getListMyCollaborationInProgress(state),
    listToRate: selectMyCollaborationToRateList(state),
    listRatedCompleted: selectMyCollaborationCompletedRatedList(state),
    isFetching: getIsFetchingMyCollaboration(state),
  },
  collaborationReview: {
    isListLoading: selectCollaborationReviewIsListLoading(state),
    params: selectCollaborationReviewListParams(state),
    list: selectCollaborationReviewList(state),
    listTotal: selectCollaborationReviewListTotal(state),
  },
});

export default connect(mapStateToProps)(MyCollaborationsList);
