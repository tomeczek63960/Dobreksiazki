import React from 'react';
import ReactDOM from 'react-dom';
import Root from './jsx/Root';
import { Provider } from 'react-redux';
import './css/index.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'react-toastify/dist/ReactToastify.css';
import store from 'jsx/01-redux/index';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
