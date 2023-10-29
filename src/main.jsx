import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider} from '@react-oauth/google'

import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import 'animate.css';

import ChatApp from './ChatApp.jsx'
import './index.css'


ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="491362405333-1qfot3boei2kpc91km6qstmbourqanpp.apps.googleusercontent.com">
    <BrowserRouter>
      <Provider store={store}>
        <React.StrictMode>
          <ChatApp />
        </React.StrictMode>
      </Provider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
