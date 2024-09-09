import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import Footer from './stories/footer/FooterComponent';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import { SnackbarProvider } from 'notistack';
import { PopupManagerProvider } from './stories/popup/main.js';
import './App.scss';


function App() {
  return (
    <>
        <PopupManagerProvider>
      <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
        <RouterProvider router={router} />
   <Footer />
      </Provider>
    </SnackbarProvider>
    </PopupManagerProvider>
    </>
  );
}
export default App;