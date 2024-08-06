import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import Footer from './stories/footer/FooterComponent';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import { PopupProvider } from "react-popup-manager";
import { MainPopup } from "./stories/popup/Main.jsx";
import './App.scss';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Provider store={store}>
      <PopupProvider>

        <Footer />
    <MainPopup />
  </PopupProvider>
      </Provider>
    </>
  );
}
export default App;
