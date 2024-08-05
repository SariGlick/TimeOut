import { Provider } from 'react-redux';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import Footer from './stories/footer/FooterComponent';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import './App.scss';
import OTPInput from './components/Login/OTPInput.jsx';
import { createContext, useState } from 'react';
import Reset from './components/Login/Reset.jsx';
import Nav from './router/Nav.jsx';

export const RecoveryContext = createContext();

  const  App= () => {

  const [page, setPage] = useState("/Login");
  const [email, setEmail] = useState("anonimi");

  const [otp, setOTP] = useState("0000");

  return (
    <>
    <BrowserRouter>
        <RecoveryContext.Provider
        value={{ page, setPage, otp, setOTP, setEmail, email }} >
          <Provider store={store}>
          <Footer />
          <Nav></Nav>
          </Provider>
        </RecoveryContext.Provider>
      </BrowserRouter>
    </>
  );
}
export default App;

