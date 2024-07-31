import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'

function App() {
  
  
  return (

    <>
      <Provider store={store}>
      <Header/>
        <Footer />
      </Provider>
    </>
  );
}
export default App;
