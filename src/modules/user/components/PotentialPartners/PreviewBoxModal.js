import React, { memo } from 'react';
import PropTypes from 'prop-types';
// components
import HelpMenuModal from '../../../../components/Modal/HelpMenuModal';
import ModalRow, { ModalText } from '../../../../components/Modal/ModalRow';

function PotentialPartnerPreviewBoxModal(props) {
  const {
    isOpen,
    toggleModal,
    blockUser,
    addUserToFavorite,
    isUserFavorite,
  } = props;
  return (
    <HelpMenuModal isOpen={isOpen} title={''} toggleModal={toggleModal}>
      <ModalRow onPress={blockUser}>
        <ModalText isDanger>Block User</ModalText>
      </ModalRow>
      <ModalRow onPress={addUserToFavorite}>
        <ModalText>
          {isUserFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </ModalText>
      </ModalRow>
    </HelpMenuModal>
  );
}

PotentialPartnerPreviewBoxModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  blockUser: PropTypes.func,
  addUserToFavorite: PropTypes.func,
  isUserFavorite: PropTypes.bool,
};

export default memo(PotentialPartnerPreviewBoxModal);
