import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SiteDataProvider } from './context/SiteDataContext';
import { ToastProvider } from './context/ToastContext';
import ToastContainer from './components/ToastContainer';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SiteDataProvider>
        <ToastProvider>
          <App />
          <ToastContainer />
        </ToastProvider>
      </SiteDataProvider>
    </BrowserRouter>
  </StrictMode>,
);
