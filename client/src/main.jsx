import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import Store from './redux/store.js'; 
import './index.css';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe('pk_test_51PfqwiCGbLo9hQNnWsRZyjvaOyLaO65kALuYrQtzWdFu2DmX6QhXQiozZQq7LzzRpTXN6zUUPwtJNnZZ1D5rbVY100OFRhlwg4');

ReactDOM.createRoot(document.getElementById('root')).render(

    <Provider store={Store}>
      <BrowserRouter>
      <Elements stripe={stripePromise}>
        <App />
        </Elements>
      </BrowserRouter>
    </Provider>


);
