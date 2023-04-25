import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import Avatar from '../User/Avatar';
import MessageAttachment from './MessageAttachment';
import { lightBlueGrey } from '../../assets/jss/styles';
import { formatToDateString, formatToTimeString } from '../../actions/utils';
import { useLinkDetectionInText } from '../../hooks';

const text = {
  lineHeight: 18,
  letterSpacing: 0,
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 17,
    paddingBottom: 22,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: lightBlueGrey,
    marginBottom: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 7,
    paddingRight: 12,
  },
  avatar: {
    width: 37,
    height: 37,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: lightBlueGrey,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  mainContainer: {
    flex: 1,
    paddingRight: 19,
    paddingLeft: 11,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 1,
    paddingBottom: 1,
  },
  nameText: {
    ...text,
    fontFamily: 'lato-bold',
  },
  separator: {
    borderRadius: 50,
    width: 4,
    height: 4,
    backgroundColor: 'rgb(51, 51, 51)',
    marginRight: 6,
    marginLeft: 6,
  },
  dateText: {
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0,
    fontFamily: 'lato-bold',
  },
  messageContainer: {
    marginTop: 5,
  },

  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
    marginTop: 9,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgb(151,151,151)',
  },
  separatorDateText: {
    marginRight: 19,
    marginLeft: 19,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0,
  },
});

export const Message = ({
  isNewDay,
  author = {},
  createdAt,
  text,
  _id,
  attachment,
}) => {
  const [MessageText, linkAttachment] = useLinkDetectionInText(text);

  if (!attachment) {
    attachment = linkAttachment;
  }

  return (
    <React.Fragment>
      {isNewDay && (
        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorDateText}>
            {formatToDateString(createdAt)}
          </Text>
          <View style={styles.separatorLine} />
        </View>
      )}
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Avatar
              name={`${author.firstName} ${author.lastName}`}
              size={37}
              avatar={author.avatar}
              idUser={author._id}
            />
          </View>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.nameRow}>
            <Text
              style={styles.nameText}
            >{`${author.firstName} ${author.lastName}`}</Text>
            <View style={styles.separator} />
            <Text style={styles.dateText}>{formatToTimeString(createdAt)}</Text>
          </View>
          <View style={styles.messageContainer}>
            <Text>{MessageText}</Text>
            <MessageAttachment attachment={attachment} idMessage={_id} />
          </View>
        </View>
      </View>
    </React.Fragment>
  );
};

Message.propTypes = {
  author: PropTypes.shape({
    _id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatar: PropTypes.shape({
      src: PropTypes.string,
    }),
  }),
  text: PropTypes.string,
  status: PropTypes.oneOf(['sent', 'viewed']),
  createdAt: PropTypes.string,
  isNewDay: PropTypes.bool,
  attachment: PropTypes.object,
};

export default memo(Message);
