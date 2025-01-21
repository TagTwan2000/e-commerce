import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css';
import Home from './home';
import Form from './components/Form';
import { Login } from './components/Login';

import { StateContext } from '../Context/StateContext';
import { Toaster } from 'react-hot-toast';
import Cart from "./components/Cart";
import Order from "./Order";
import { CartScrean } from "./CartScrean";
import { AuthProvider } from "../Auth";
const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/form', element: <Form /> },

  { path: '/login', element: <Login /> },
 
  { path: '/order', element: <Order /> },
  { path: '/cart', element: <CartScrean /> }, // Testm component
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <StateContext>
    <Toaster />
      <RouterProvider router={router} />
    </StateContext>
    </AuthProvider>
  </StrictMode>
);
