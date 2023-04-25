import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
// hoc
import withNavigation from 'src/modules/core/hocs/withNavigation';
// core components
import Avatar from '../User/Avatar';
import Button from '../Buttons/Button';
import Spinner from '../Spinner';
import { lightBlueGrey, primaryColor } from '../../assets/jss/styles';
// actions
import {
  changeStatusRequestRequest,
  cancelRequestRequest,
} from '../../actions/request';
import { getCollaborationTimeStarted } from '../../actions/utils';
import { isCancelingRequest } from '../../selectors/request';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 14,
    paddingLeft: 20,
    paddingBottom: 29,
    paddingRight: 30,
    marginBottom: 5,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.31,
    shadowOffset: {
      height: 1,
    },
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
  },
  headerInfoContainer: {
    paddingLeft: 14,
    flex: 1,
  },
  headerAuthorName: {
    fontFamily: 'lato-bold',
    lineHeight: 18,
    letterSpacing: 0,
  },
  headerAuthorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAuthorInfoText: {
    color: lightBlueGrey,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
  },
  separator: {
    backgroundColor: lightBlueGrey,
    borderRadius: 50,
    width: 4,
    height: 4,
    marginLeft: 7,
    marginRight: 7,
    marginTop: 3,
  },
  headerAuthorInfoIndustry: {
    marginTop: 3,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0,
  },
  requestTextContainer: {
    marginTop: 16,
    paddingLeft: 51,
    paddingRight: 41,
    marginBottom: 30,
  },
  requestTitleContainer: {
    marginTop: 10,
    paddingLeft: 51,
    paddingRight: 41,
    paddingBottom: 21,
  },
  requestText: {
    lineHeight: 18,
    letterSpacing: 0,
  },
  requestTitleText: {
    fontFamily: 'lato-bold',
    lineHeight: 18,
    letterSpacing: 0,
  },
  buttonsContainer: {
    paddingLeft: 11,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
  },
  bottomButton: {
    width: 142,
    marginBottom: 0,
  },
  authorNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0,
  },
});

class RequestBox extends React.PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(['incoming', 'outgoing']),
    isCanceling: PropTypes.bool,
    request: PropTypes.shape({
      _id: PropTypes.string,
      user: PropTypes.shape({
        _id: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
        industry: PropTypes.string,
        avatar: PropTypes.shape({
          src: PropTypes.string,
        }),
      }),
      collaboration: PropTypes.shape({
        _id: PropTypes.string,
      }),
    }),
  };

  render() {
    const { request, type, isCanceling } = this.props;
    const {
      collaboration: { author, title, startDate },
    } = request;
    const { user } = request;

    const userFullname =
      type === 'incoming'
        ? `${user.firstName} ${user.lastName}`
        : `${author.firstName} ${author.lastName}`;
    const avatar = type === 'incoming' ? user.avatar : author.avatar;
    const idUser = type === 'incoming' ? user._id : author._id;
    const companyName =
      type === 'incoming' ? user.companyName : author.companyName;
    const city = type === 'incoming' ? user.city : author.city;
    const industry = type === 'incoming' ? user.industry : author.industry;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Avatar
            name={userFullname}
            size={37}
            avatar={avatar}
            idUser={idUser}
          />
          <View style={styles.headerInfoContainer}>
            <View style={styles.authorNameContainer}>
              <Text
                style={[
                  styles.headerAuthorName,
                  type === 'outgoing' && { fontFamily: 'lato-regular' },
                ]}
              >
                {userFullname}
              </Text>
              {type === 'outgoing' && (
                <Text style={styles.time}>
                  {getCollaborationTimeStarted(startDate)}
                </Text>
              )}
            </View>
            <View style={styles.headerAuthorInfo}>
              <Text style={styles.headerAuthorInfoText} numberOfLines={1}>
                {companyName}
              </Text>
              <View style={styles.separator} />
              <Text style={styles.headerAuthorInfoText} numberOfLines={1}>
                {city}
              </Text>
            </View>
            {type === 'incoming' && (
              <Text style={styles.headerAuthorInfoIndustry}>{industry}</Text>
            )}
          </View>
        </View>
        {type === 'incoming' ? (
          <View style={styles.requestTextContainer}>
            <Text style={styles.requestText}>
              {userFullname} has requested to join your partnership: "
              {request.collaboration.title}".
            </Text>
          </View>
        ) : (
          <View style={styles.requestTitleContainer}>
            <Text style={styles.requestTitleText}>{title}</Text>
          </View>
        )}
        {type === 'incoming' && (
          <>
            <View style={styles.buttonsContainer}>
              <Button
                onPress={() =>
                  this.props.navigation.push('Profile', {
                    idUser: request.user._id,
                  })
                }
                type={'success'}
                styleButton={{ marginBottom: 17 }}
              >
                <Text style={styles.buttonText}>View Profile</Text>
              </Button>
            </View>
            <View
              style={[
                styles.buttonsContainer,
                { flexDirection: 'row', justifyContent: 'space-between' },
              ]}
            >
              <Button
                type={'secondary'}
                styleButton={styles.bottomButton}
                onPress={() =>
                  this.props.dispatch(
                    changeStatusRequestRequest(request._id, 'deny'),
                  )
                }
              >
                <Text style={[styles.buttonText, { color: primaryColor.main }]}>
                  Decline Request
                </Text>
              </Button>
              <Button
                type={'primary'}
                styleButton={styles.bottomButton}
                onPress={() =>
                  this.props.dispatch(
                    changeStatusRequestRequest(request._id, 'approve'),
                  )
                }
              >
                <Text style={styles.buttonText}>Accept Request</Text>
              </Button>
            </View>
          </>
        )}
        {type === 'outgoing' && (
          <Spinner isFetching={isCanceling}>
            <View style={styles.buttonsContainer}>
              <Button
                onPress={() =>
                  this.props.dispatch(cancelRequestRequest(request._id))
                }
                type={'secondary'}
                styleButton={{ marginBottom: 17 }}
              >
                <Text style={[styles.buttonText, { color: primaryColor.main }]}>
                  Cancel Partnership Request
                </Text>
              </Button>
            </View>
            <View style={styles.buttonsContainer}>
              <Button
                onPress={() =>
                  this.props.navigation.push('CollaborationView', {
                    idCollaboration: request.collaboration._id,
                  })
                }
                type={'primary'}
                styleButton={{ marginBottom: 0 }}
              >
                <Text style={styles.buttonText}>View Partnership</Text>
              </Button>
            </View>
          </Spinner>
        )}
      </View>
    );
  }
}

RequestBox = connect((state, props) => ({
  isCanceling: isCancelingRequest(state, props),
}))(RequestBox);

export default withNavigation(RequestBox);
