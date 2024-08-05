
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import Footer from './stories/footer/FooterComponent';
import './App.scss';
function App() {
  
  
  return (


    <> 
    <RouterProvider router={router}/>
      <Provider store={store}>
        <Footer />
      </Provider>
    </>
  );
}
export default App;
