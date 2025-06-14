import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
const domain = process.env.AUTH0_DOMAIN || "dev-16owegwjtxsyxvsj.us.auth0.com";
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || "yklPfdGaunoaxt0acf5ypHDFzVpDy4Wk"; 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
  domain={domain}
  clientId={clientId}
  authorizationParams={{
    redirect_uri: window.location.origin
  }}
>
    <App />
    </Auth0Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
