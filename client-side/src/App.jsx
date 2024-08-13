import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import './App.scss';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import { ThemeProvider } from './themes/ThemeProvider.jsx';
import Footer from './stories/footer/FooterComponent';

function App() {

  return (
    <>
      <ThemeProvider>
        <SnackbarProvider maxSnack={3}>
          <Provider store={store}>
            <RouterProvider router={router} />
            <Footer />
          </Provider>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}
export default App;