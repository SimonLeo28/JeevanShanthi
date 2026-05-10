import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { fontFamily: '"DM Sans", sans-serif', fontSize: '14px' },
          success: { style: { background: '#dcfce7', color: '#166534', border: '1px solid #86efac' } },
          error: { style: { background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5' } },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
)
