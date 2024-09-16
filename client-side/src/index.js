import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import { SnackbarProvider } from 'notistack';

import reportWebVitals from './reportWebVitals';
import App from './App';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
     <React.Suspense fallback='loading'>
       <Provider store={store}>
         <App />
       </Provider>
     </React.Suspense>
    </React.StrictMode>

  

);
reportWebVitals();