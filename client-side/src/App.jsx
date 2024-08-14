import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import Footer from './stories/footer/FooterComponent';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import { PopupProvider } from "react-popup-manager";
import { MainPopup } from "./stories/popup/Main.jsx";
import { SnackbarProvider } from 'notistack';
import './App.scss';

function App() {
  return (

    <>
      <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
      <PopupProvider>
        <RouterProvider router={router} />
        <Footer />
    <MainPopup />
  </PopupProvider>
      </Provider>
    </SnackbarProvider>
    </>
  );
}
export default App;