import React from 'react';
import PropTypes from 'prop-types';
import HelpMenuModal from './HelpMenuModal';
import ModalRow, { ModalText } from './ModalRow';

export default class ComplaintReasonModal extends React.PureComponent {
  static propTypes = {
    onCreateComplaint: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
  };

  render() {
    const { isOpen, onCreateComplaint, toggleModal } = this.props;

    return (
      <HelpMenuModal
        isOpen={isOpen}
        title={'Why are you reporting this content'}
        toggleModal={toggleModal}
      >
        <ModalRow onPress={() => onCreateComplaint('Spam or Scam')}>
          <ModalText isDanger>Spam or Scam</ModalText>
        </ModalRow>
        <ModalRow onPress={() => onCreateComplaint('Abusive Content')}>
          <ModalText isDanger>Abusive Content</ModalText>
        </ModalRow>
        <ModalRow onPress={() => onCreateComplaint('Harassment')}>
          <ModalText isDanger>Harassment</ModalText>
        </ModalRow>
        <ModalRow onPress={() => onCreateComplaint('Nudity')}>
          <ModalText isDanger>Nudity</ModalText>
        </ModalRow>
        <ModalRow onPress={() => onCreateComplaint('Violence')}>
          <ModalText isDanger>Violence</ModalText>
        </ModalRow>
      </HelpMenuModal>
    );
  }
}
