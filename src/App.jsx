import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import Footer from './stories/footer/FooterComponent';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import SignUp from './components/signUp/signUp.jsx';
import Login from './components/Login/login.jsx';
import './App.scss';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Provider store={store}>
        {/* <SignUp/> */}
        {/* <Login/> */}
        <Footer />

        
        
      </Provider>
    </>
  );
}
export default App;
