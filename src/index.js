import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import { AppProvider } from './context/productContext';
import { FilterContextProvider } from './context/filterContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <AppProvider>
    <FilterContextProvider>
    <Router>
    <App />
    </Router>
    </FilterContextProvider>
  </AppProvider>
  
);


