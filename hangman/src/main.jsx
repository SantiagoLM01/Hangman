import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './app.css'
import 'animate.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './AppRouter';
import WordProvider from './context/WordContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <WordProvider>
        <AppRouter />
      </WordProvider>
    </React.StrictMode>
  </BrowserRouter>
)
