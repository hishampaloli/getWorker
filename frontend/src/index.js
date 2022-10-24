import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { ContextProvider } from "./SocketContext";
import store from './store';
import {PAYPAL} from './contants/paymentConstants'
import {PayPalScriptProvider} from '@paypal/react-paypal-js'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <PayPalScriptProvider options={{"client-id":PAYPAL}}>
  <Provider store={store}>
  <ContextProvider>
  <App/>
    </ContextProvider>
  </Provider>
  </PayPalScriptProvider>
);