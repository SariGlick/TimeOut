import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import Footer from './stories/footer/FooterComponent'
import { SnackbarProvider } from 'notistack';

function App() {

  return (
    <>
      {/* <SnackbarProvider maxSnack={3}> */}
     <RouterProvider router={router} />
      <Provider store={store}>
        <Footer />
      </Provider>
    {/* </SnackbarProvider> */}
    </>
  );
}
export default App;
