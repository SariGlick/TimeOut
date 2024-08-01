import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import Footer from './stories/footer/FooterComponent';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import './App.scss';
import Report from './components/Report/report.jsx';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Provider store={store}>
        <Report />
        <Footer />
      </Provider>
    </>
  );
}
export default App;
