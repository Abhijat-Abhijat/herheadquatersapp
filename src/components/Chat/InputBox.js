import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
// core components
import { lightBlueGrey, dimensions } from '../../assets/jss/styles';
import SendMessageButton from '../Buttons/SendMessageButton';
import AttachButton from '../Buttons/AttachButton';
import { getProfile } from '../../selectors/user';
import { getChat } from '../../selectors/chat';
// actions
import { sendMessageRequest } from '../../actions/message';
import { uploadAttachment } from '../../actions/upload';
import { attachmentType } from '../Fields/enums';

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: lightBlueGrey,
    marginTop: 2,
  },
  mainContainer: {
    backgroundColor: '#fff',
    paddingBottom: 13,
    paddingRight: 20,
    paddingTop: 19,
    paddingLeft: 19,
    borderTopWidth: 1,
    borderTopColor: lightBlueGrey,
  },
  subjectContainer: {
    backgroundColor: '#fff',
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 19,
  },
  inputContainer: {
    maxHeight: dimensions.fullHeight / 5,
  },
  input: {
    letterSpacing: 0,
    lineHeight: 18,
    fontFamily: 'lato-regular',
    fontSize: 13,
    paddingTop: 0,
  },
  buttonContainer: {
    marginTop: 19,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  attachmentActionsContainer: {
    flexDirection: 'row',
  },
});

class InputBox extends React.Component {
  static propTypes = {
    myId: PropTypes.string,
    chat: PropTypes.object,
  };

  textInput = React.createRef();

  state = {
    subject: null,
    message: null,
  };

  sendMessage = () => {
    if (!this.state.message) {
      return;
    }

    this.props.dispatch(
      sendMessageRequest(this.state.message, {
        subject: this.state.subject,
      }),
    );

    if (this.state.subject) {
      this.props.navigation.setParams({
        title: this.state.subject,
      });
    }

    this.setState({
      message: null,
      subject: null,
    });
  };

  onChange = (field) => (text) => {
    this.setState({
      [field]: text,
    });
  };

  onFocus = () => {
    this.textInput.current.focus();
  };

  uploadAttachment = (type) => {
    this.props.dispatch(uploadAttachment(type));
  };

  render() {
    const { chat, myId } = this.props;

    const corresponder = chat.participants
      ? chat.participants.find((user) => user._id !== myId)
      : {};

    return (
      <View style={styles.container}>
        {chat && !chat.subject && (
          <View style={styles.subjectContainer}>
            <TextInput
              onChangeText={this.onChange('subject')}
              placeholder={'Subject:'}
              blurOnSubmit={false}
              multiline={false}
              placeholderTextColor={lightBlueGrey}
              style={styles.input}
              value={this.state.subject}
            />
          </View>
        )}
        <TouchableWithoutFeedback onPress={this.onFocus}>
          <View style={styles.mainContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={this.onChange('message')}
                placeholder={`Write a message to ${
                  corresponder ? corresponder.firstName : '...'
                }`}
                blurOnSubmit={false}
                multiline={true}
                placeholderTextColor={lightBlueGrey}
                style={styles.input}
                value={this.state.message}
                ref={this.textInput}
              />
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.attachmentActionsContainer}>
                <AttachButton
                  name={'attachment'}
                  onPress={() => this.uploadAttachment(attachmentType.file)}
                />
                <AttachButton
                  name={'picture-1'}
                  onPress={() => this.uploadAttachment(attachmentType.library)}
                />
                <AttachButton
                  name={'camera'}
                  onPress={() => this.uploadAttachment(attachmentType.camera)}
                />
              </View>
              <SendMessageButton onPress={this.sendMessage} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  myId: getProfile(state)._id,
  chat: getChat(state),
});

export default connect(mapStateToProps)(InputBox);
