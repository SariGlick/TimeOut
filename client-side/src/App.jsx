import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'
import Settings from './components/settings/Notifications.jsx';

function App() {
  
   

  
  return (

    <>
      {/* <RouterProvider router={router} /> */}
      <Provider store={store}>
      <Header/>
        <Footer />
      </Provider>
    </>
  );
}
export default App;
