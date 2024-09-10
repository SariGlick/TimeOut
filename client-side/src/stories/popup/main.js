import React, { useState, createContext, useContext } from 'react';

const PopupManagerContext = createContext();

export const usePopupManager = () => useContext(PopupManagerContext);

export const PopupManagerProvider = ({ children }) => {
  const [popupComponent, setPopupComponent] = useState(null);
  const [popupProps, setPopupProps] = useState({});

  const openPopup = (Component, props) => {
    setPopupComponent(() => Component);
    setPopupProps(props);
  };

  const closePopup = () => {
    setPopupComponent(null);
    setPopupProps({});
  };

  return (
    <PopupManagerContext.Provider value={{ openPopup, closePopup }}>
      {children}
      {popupComponent && (
        <popupComponent {...popupProps} isOpen={true} onClose={closePopup} />
      )}
    </PopupManagerContext.Provider>
  );
};
