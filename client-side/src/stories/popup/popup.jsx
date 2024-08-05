import React from 'react';
import Modal from 'react-modal';
import './popup.scss';  

export const popup = ({ popupContent, isOpen, onClose }) => {
  const close = () => {
    onClose('param', 'param2', 'param3');
  };

  return (
    <Modal isOpen={isOpen} className="ReactModal__Content" overlayClassName="ReactModal__Overlay">
      <div className="modal-body">
        {popupContent}
      </div>
        <button className="modal-button" onClick={close}>Close</button>
    </Modal>
  );
};
