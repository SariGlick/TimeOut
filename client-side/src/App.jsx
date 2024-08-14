import './App.scss';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import Footer from './stories/footer/FooterComponent'
import { SnackbarProvider } from 'notistack';
import './App.scss';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
function App() {
  const {i18n} = useTranslation();
  useEffect(()=>{
   i18n.changeLanguage('en')
  },[])
  return (
     
    <>
      <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
      <RouterProvider router={router} />
        <Footer />
        </Provider>
    </SnackbarProvider>
    </>
  );
}
export default App;