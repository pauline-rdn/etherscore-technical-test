import React,  { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';

import "./services/i18n";
import UserTransaction from './components/UserTransaction';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<App/>} />
          <Route path="transactions" element={<UserTransaction />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);
