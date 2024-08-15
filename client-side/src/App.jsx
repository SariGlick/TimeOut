import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import Footer from './stories/footer/FooterComponent';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import { SnackbarProvider } from 'notistack';
import './App.scss';
import startLocationTracking from './services/googleMapService.js';

function App() {
  useEffect(() => {
    startLocationTracking();
  }, []);

  return (
<<<<<<< HEAD
    <SnackbarProvider maxSnack={3}>
=======

    <>
      <SnackbarProvider maxSnack={3}>
>>>>>>> 74f67f50c8ffb1942092e670a609eb5f84bfac7e
      <Provider store={store}>
        <RouterProvider router={router} />
        <Footer />
      </Provider>
    </SnackbarProvider>
  );
}
<<<<<<< HEAD

export default App;
=======
export default App;
>>>>>>> 74f67f50c8ffb1942092e670a609eb5f84bfac7e
