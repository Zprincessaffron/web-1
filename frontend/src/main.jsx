import React from 'react'
import ReactDOM from 'react-dom/client'
import 'regenerator-runtime/runtime';
import App from './App.jsx' 
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'
import axios from 'axios';

axios.defaults.baseURL = 'https://web-1-3.onrender.com';
axios.defaults.withCredentials = true;
// http://localhost:4040
ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <Router>
      <App />
    </Router>
  //</React.StrictMode>,
)
