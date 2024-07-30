import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import './App.scss';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'
import Settings from './components/settings/Settings.jsx';
import VerticalTabss from './stories/verticalTabs/verticalTabss.jsx';

function App() {
 
  
  return (

    <>
      <Provider store={store}>
        <Footer />
      </Provider>
    </>
  );
}
export default App;
