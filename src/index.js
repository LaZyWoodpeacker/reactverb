import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import Auth from './pages/Auth';
import { BrowserRouter, Route } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Route path="/auth" component={Auth} exact />
    <Route path="/admin" component={App} exact />
    <Route path="/" component={App} exact />
  </BrowserRouter>,
  document.getElementById('root')
);