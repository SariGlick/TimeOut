import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store.jsx';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './index.scss';
import './i18n.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <React.Suspense fallback='loading'>
        <App />
      </React.Suspense>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
