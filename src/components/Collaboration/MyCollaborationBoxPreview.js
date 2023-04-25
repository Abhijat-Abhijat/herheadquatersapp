import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// hoc
import withNavigation from 'src/modules/core/hocs/withNavigation';
// core components
import { coolGrey, lightBlueGrey } from '../../assets/jss/styles';
import Icon from '../Icons/HerHeadquartersIcon';
import Avatar from '../User/Avatar';
import Button from '../Buttons/Button';
// actions
import {
  getShortState,
  getCollaborationTimeStarted,
} from '../../actions/utils';
import { getProfile } from '../../selectors/user';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.31,
    shadowOffset: {
      height: 1,
    },
    shadowRadius: 2,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    paddingTop: 14,
    marginBottom: 5,
  },
  headerAvatar: {
    paddingLeft: 19,
    paddingRight: 14,
  },
  headerAuthorContainer: {
    flex: 1,
  },
  headerAuthorName: {
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
  },
  headerAuthorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flexBasis: '50%',
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
  time: {
    paddingRight: 20,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0,
  },
  footer: {
    paddingLeft: 71,
    paddingRight: 22,
    paddingBottom: 15,
    flexDirection: 'row',
  },
  footerTextContainer: {
    flex: 1,
    paddingRight: 10,
    marginBottom: 11,
  },
  title: {
    fontFamily: 'lato-bold',
    lineHeight: 18,
    letterSpacing: 0,
    marginBottom: 1,
  },
  overviewText: {
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0,
  },
  rateText: {
    marginTop: 18,
    marginBottom: 30,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
  },
  rateTextButton: {
    color: '#fff',
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
  },
  buttonContainer: {
    paddingLeft: 19,
    paddingRight: 14,
  },
});

class MyCollaborationBoxPreview extends React.PureComponent {
  static propTypes = {
    collaboration: PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
    }),
    type: PropTypes.oneOf(['default', 'rate', 'open', 'completed']),
    myId: PropTypes.string,
  };

  static defaultProps = {
    type: 'default',
  };

  getParticipant = () => {
    const { myId, collaboration, type } = this.props;

    if (collaboration.author._id === myId && type !== 'open') {
      return collaboration.users && Array.isArray(collaboration.users)
        ? collaboration.users[0] || {}
        : {};
    } else {
      return collaboration.author || {};
    }
  };

  render() {
    const { collaboration, type } = this.props;
    const participant = this.getParticipant();
    const isParticipantExists = !!participant._id;

    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.push('CollaborationView', {
            idCollaboration: collaboration._id,
          })
        }
        style={styles.container}
      >
        <View style={styles.header}>
          <View style={styles.headerAvatar}>
            {isParticipantExists ? (
              <Avatar
                size={37}
                name={`${participant.firstName} ${participant.lastName}`}
                avatar={participant.avatar}
                idUser={participant._id}
              />
            ) : (
              <Icon name={'user'} size={37} color={'#c8c7cc'} />
            )}
          </View>
          <View style={styles.headerAuthorContainer}>
            <Text style={styles.headerAuthorName}>
              {isParticipantExists
                ? `${participant.firstName} ${participant.lastName}`
                : 'No participants'}
            </Text>
            <View style={styles.headerAuthorInfo}>
              <Text style={styles.headerAuthorInfoText} numberOfLines={1}>
                {participant.companyName}
              </Text>
              <View style={styles.separator} />
              {!collaboration.remote ? (
                <Text style={styles.headerAuthorInfoText} numberOfLines={1}>
                  {collaboration.city}
                  {collaboration.state && ', '}
                  {getShortState(collaboration.state)}
                </Text>
              ) : (
                <Text style={styles.headerAuthorInfoText} numberOfLines={1}>
                  Remote
                </Text>
              )}
            </View>
          </View>
          {type === 'default' && (
            <Text style={styles.time}>
              {getCollaborationTimeStarted(collaboration.startDate)}
            </Text>
          )}
          {type === 'completed' && (
            <Text style={styles.time}>
              {getCollaborationTimeStarted(collaboration.endDate, 'Completed ')}
            </Text>
          )}
        </View>
        <View style={styles.footer}>
          {['default', 'open', 'completed'].includes(type) ? (
            <>
              <View style={styles.footerTextContainer}>
                <Text style={styles.title}>{collaboration.title}</Text>
                <Text style={styles.overviewText} numberOfLines={3}>
                  {collaboration.overview}
                </Text>
              </View>
              <View>
                <Icon name={'ios-arrow-forward'} size={22} color={coolGrey} />
              </View>
            </>
          ) : (
            <Text style={styles.rateText}>
              {`Your partnership with ${participant.firstName} ${participant.lastName} has ended. Rate your experience collaborating with ${participant.firstName}.`}
            </Text>
          )}
        </View>
        {type === 'rate' && (
          <View style={styles.buttonContainer}>
            <Button
              onPress={() =>
                this.props.navigation.navigate('RateCollaboration', {
                  idCollaboration: collaboration._id,
                })
              }
              styleButton={{ marginBottom: 13 }}
            >
              <Text style={styles.rateTextButton}>Rate Partnership</Text>
            </Button>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state) => ({
  myId: getProfile(state)._id,
});

MyCollaborationBoxPreview = connect(mapStateToProps)(MyCollaborationBoxPreview);

export default withNavigation(MyCollaborationBoxPreview);
