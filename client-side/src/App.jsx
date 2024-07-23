import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import Footer from './stories/footer/FooterComponent';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import './App.scss';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <Footer />
    </Provider>
  );
}
export default App;
