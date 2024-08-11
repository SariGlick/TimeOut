import React from 'react';
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
import './popup.scss';  

export const popup = ({ popupContent, isOpen, onClose }) => {
  const close = () => {
    onClose('param', 'param2', 'param3');
  };

  return (
    <Modal isOpen={isOpen} className="ReactModal__Content" overlayClassName="ReactModal__Overlay">
      <button className="modal-button" onClick={close}><CloseIcon/></button>
      <div className="modal-body">
        {popupContent}
      </div>
    </Modal>
  );
};
