import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import Footer from './stories/footer/FooterComponent';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import './App.scss';
import ThemeToggleButton from './stories/themes/ThemeToggleButton.js';
function App() {

  return (
    <>
      <RouterProvider router={router} />
      <Provider store={store}>
        <ThemeToggleButton/>
        <Footer />
      </Provider>
    </>
  );
}
export default App;