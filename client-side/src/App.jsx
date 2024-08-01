import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import './App.scss';
import Header from './stories/header/header'
import VerticalTabs from './stories/verticalTabs/verticalTabss.jsx'
import Footer from './stories/footer/FooterComponent'
import AccountTab from './components/settings/accountTab.jsx'
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
