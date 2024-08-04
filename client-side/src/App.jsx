import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import './App.scss';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'
import VerticalTabs from './stories/verticalTabs/verticalTabss.jsx'
function App() {
 
  
  return (

    <>
        <Provider store={store}>
        <Header/>
        <VerticalTabs labels={['Account', 'Notifications', 'Preference ', 'Display Setting', 'Message']} elements={[<p>Account</p>,<p>Notifications</p>,<p>Preference</p>,<p>Display Setting</p>,<p>Message</p>]}/>
        <Footer />
        </Provider>
    </>
  );
}
export default App;
