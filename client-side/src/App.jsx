import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import Footer from './stories/footer/FooterComponent';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider} from './themes/ThemeProvider.jsx'

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