import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './app.jsx'
import { StoreProvider } from './context/Store.jsx'
import { ThemeProvider } from './context/ThemeProvider.jsx'
import './index.css'

// Key de Google OAuth
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <StoreProvider>
        <HelmetProvider>
          <PayPalScriptProvider deferLoading>
            <ThemeProvider storageKey='vite-ui-theme'>
              <App />
            </ThemeProvider>
          </PayPalScriptProvider>
        </HelmetProvider>
      </StoreProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
)
