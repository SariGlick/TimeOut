import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import Footer from './stories/footer/FooterComponent';
import { router } from './router/router.jsx';
import './App.scss';

function App() {
  return (
    <>
      <RouterProvider router={router} />
        <Footer />
    </>
  );
}
export default App;
