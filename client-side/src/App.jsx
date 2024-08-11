import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import Footer from './stories/footer/FooterComponent';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
<<<<<<< HEAD
import { PopupProvider } from "react-popup-manager";
import { MainPopup } from "./stories/popup/Main.jsx";
=======
import { SnackbarProvider } from 'notistack';
>>>>>>> bdd7f68e0af8626a368b8e3c8034eb2462644e7e
import './App.scss';

function App() {
  return (

    <>
      <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
<<<<<<< HEAD
      <PopupProvider>

=======
        <RouterProvider router={router} />
>>>>>>> bdd7f68e0af8626a368b8e3c8034eb2462644e7e
        <Footer />
    <MainPopup />
  </PopupProvider>
      </Provider>
    </SnackbarProvider>
    </>
  );
}
export default App;