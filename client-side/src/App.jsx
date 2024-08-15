import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import { SnackbarProvider } from 'notistack'
import Footer from './stories/footer/FooterComponent';
import './App.scss';

function App() {
  return (
    <> 
      <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
      <RouterProvider router={router}/>
        <Footer />
      </Provider>
    </SnackbarProvider>
    </>
  );
}
export default App;