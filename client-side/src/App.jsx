import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import Footer from './stories/footer/FooterComponent';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import './App.scss';
import Settings from './components/settings/Settings.jsx';
import Localization from './components/settings/UserLocalization.jsx'

function App() {

  return (
    <>
      <RouterProvider router={router} />
      <Provider store={store}>
        <Settings ></Settings>
        <Localization ></Localization>
        <Footer />
      </Provider>
    </>
  );
}
export default App;
