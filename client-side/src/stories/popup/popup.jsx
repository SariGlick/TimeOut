import React from 'react';
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import './popup.scss';

export const Popup = ({ popupContent, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen}>
      <button onClick={onClose}>
        <CloseIcon />
      </button>
      <div dangerouslySetInnerHTML={{ __html: popupContent }} />
    </Modal>
  );
};

Popup.propTypes = {
  popupContent: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
