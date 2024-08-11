import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; 
import { SnackbarProvider } from 'notistack';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { store } from './redux/store.jsx';
import './index.scss';
import  './i18n.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Provider wrapping the entire app */}
    <SnackbarProvider maxSnack={3}>
        <React.Suspense fallback='loading'>
          <App />
        </React.Suspense>
        </SnackbarProvider>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
