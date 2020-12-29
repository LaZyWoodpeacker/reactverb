import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import Auth from './pages/Auth';
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/auth" component={Auth} exact />
      <Route path="/" component={App} exact />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);