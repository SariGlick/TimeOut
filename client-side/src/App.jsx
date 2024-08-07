import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import Footer from './stories/footer/FooterComponent';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import './App.scss';
import GoogleLogin from './components/Login/GoogleLogin.jsx';
import OAuthProvider from './components/Login/OAuthProvider.jsx';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Provider store={store}>
        <Footer />
      </Provider>
      <OAuthProvider>
<GoogleLogin></GoogleLogin>
</OAuthProvider>
    
    </>
  );
}
export default App;
