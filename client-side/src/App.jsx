import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import Footer from './stories/footer/FooterComponent';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import './App.scss';
import ThemeToggleButton from './components/settings/ThemeToggleButton.jsx';
import { ThemeProvider } from './themes/ThemeContext.jsx';

function App() {

  return (
    <>
      <ThemeProvider>
        <div className="app">
          <RouterProvider router={router} />
          <Provider store={store}>
          <ThemeToggleButton />

            <Footer />

          </Provider>
        </div>
      </ThemeProvider>

    </>
  );
}
export default App;