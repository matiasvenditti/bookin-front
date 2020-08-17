import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css';
import App from './scenes/main/App/App';
import {BrowserRouter} from 'react-router-dom';
import { createBrowserHistory } from 'history';

ReactDOM.render(
  <BrowserRouter>
    <App history={createBrowserHistory()}/> 
  </BrowserRouter>,
  document.getElementById('root')
);
