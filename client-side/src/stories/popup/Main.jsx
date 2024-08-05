import React from "react";
import { usePopupManager } from "react-popup-manager";
import { popup } from "./popup";
import './popup.scss'; 


export const MainPopup = ({title}) => {
  const popupManager = usePopupManager();
  const openModal = () => {
    popupManager.open(popup, {
      title: 'my modal',
      onClose: (...params) => console.log('modal has closed with:', ...params), 
    }); 
  }
  return (
      <div>
        <button className="modal-button" onClick={() => openModal()}>
          {title}
        </button>
      </div>
  );
}