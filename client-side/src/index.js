import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; 

import reportWebVitals from './reportWebVitals';
import App from './App';
import { store } from './redux/store.jsx';
import './index.scss';
import  './i18n.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Provider wrapping the entire app */}
        <React.Suspense fallback='loading'>
          <App />
        </React.Suspense>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
