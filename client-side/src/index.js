import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Provider } from 'react-redux';
import { store } from './redux/store.jsx';
import App from './App.jsx';
import './index.scss';


const port = process.env.REACT_APP_PORT
const url = process.env.REACT_APP_URL

const client = new ApolloClient({

  uri: `${url}:${port}`,

  cache: new InMemoryCache()

});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
reportWebVitals();
