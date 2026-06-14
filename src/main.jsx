import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary'

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <CartProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </CartProvider>
        </BrowserRouter>
      </HelmetProvider>
    </StrictMode>
  </ErrorBoundary>,
)
