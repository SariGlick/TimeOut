import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import Footer from './stories/footer/FooterComponent';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import MessageComponent from './components/Message'
import './App.scss';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Provider store={store}>
        <MessageComponent/>
        <Footer />
      </Provider>
    </>
  );
}
export default App;
