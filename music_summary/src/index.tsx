import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';

import routes from './routes';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <Router history={history}>{routes}</Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
