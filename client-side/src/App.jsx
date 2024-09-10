import React from 'react'; 
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import Footer from './stories/footer/FooterComponent'
import { SnackbarProvider } from 'notistack';
import './App.scss';


function App() {
  return (

    <>
     <RouterProvider router={router} />
      <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
        <Footer />
        </Provider>
    </SnackbarProvider>
    </>
  );
}
export default App;
