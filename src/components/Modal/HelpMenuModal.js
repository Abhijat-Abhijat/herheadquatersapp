import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { lightBlueGrey, primaryColor } from '../../assets/jss/styles';

const styles = StyleSheet.create({
  avatarModalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
    marginLeft: 10,
    marginRight: 10,
  },
  mainButtonsModal: {
    backgroundColor: '#fff',
    opacity: 0.9,
    alignItems: 'center',
    borderRadius: 14,
    marginBottom: 10,
  },
  modalLabel: {
    marginTop: 13,
    marginBottom: 14,
    color: lightBlueGrey,
    lineHeight: 18,
    letterSpacing: 0,
  },
  cancelButton: {
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingBottom: 19,
    borderRadius: 14,
    width: '100%',
  },
  cancelButtonText: {
    color: primaryColor.main,
    fontFamily: 'lato-bold',
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
    textAlign: 'center',
  },
});

export default class HelpMenuModal extends React.PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  };

  render() {
    const { isOpen, toggleModal, title, children } = this.props;

    return (
      <Modal
        isVisible={isOpen}
        onRequestClose={toggleModal}
        onBackButtonPress={toggleModal}
        onBackdropPress={toggleModal}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        backdropTransitionOutTiming={0}
        style={styles.avatarModalContainer}
      >
        <SafeAreaView>
          <View style={styles.mainButtonsModal}>
            <Text style={styles.modalLabel}>{title}</Text>
            {children}
          </View>
          <TouchableOpacity onPress={toggleModal} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    );
  }
}
