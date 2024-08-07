import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import Footer from './stories/footer/FooterComponent';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import { SnackbarProvider } from 'notistack';
import './App.scss';
function App() {
  return (
<<<<<<< HEAD
    <SnackbarProvider maxSnack={3}>
=======
    <>
      <SnackbarProvider maxSnack={3}>
>>>>>>> dca0ad0095f7a522b64fa08edd7ce232975626af
      <Provider store={store}>
        <RouterProvider router={router} />
        <Footer />
      </Provider>
    </SnackbarProvider>
<<<<<<< HEAD
=======
    </>
>>>>>>> dca0ad0095f7a522b64fa08edd7ce232975626af
  );
}
export default App;
