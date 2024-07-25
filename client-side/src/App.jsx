import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import Footer from './stories/footer/FooterComponent';
import iconHeader from './components/iconHeader'
// import { router } from './router/router.jsx';
// import { store } from './redux/store.jsx';
import './App.scss';
import { inputAdornmentClasses } from '@mui/material';

function App() {
  return (
    <>
      {/* <RouterProvider router={router} /> */}
      {/* <Provider store={store}> */}
      <footer/>
      <iconHeader />
      {/* </Provider> */}
    </>
  );
}
export default App;
