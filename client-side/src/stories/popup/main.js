import React from "react";
import { usePopupManager } from "react-popup-manager";
import { Popup } from "./popup";

export const Main = () => {
  const popupManager = usePopupManager();
  const openPopup = () => {
    // open popup with it's needed `props` and an `onClose` callback function
    popupManager.open(Popup, {
      popupContent: '',
      onClose: (...params) => console.error('modal has closed with:', ...params), // modal has closed with: param param2 param3
    }); 
  }
  return (
      <div>
        <button onClick={() => openPopup()}>
          popup
        </button>
      </div>
  );
}