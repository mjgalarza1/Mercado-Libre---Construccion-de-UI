import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'

import "./index.css";

import Layout from "./pages/Layout.jsx";
import Home from "./pages/Home.jsx"
import ErrorPage from "./pages/ErrorPage.jsx";
import Login from "./pages/Login.jsx"
import Register from './pages/Register.jsx';
import Product from './pages/Product.jsx';
import NewProduct from './pages/NewProduct.jsx';
import Categories from './pages/Categories.jsx';
import Category from './pages/Category.jsx';
import User from './pages/User.jsx';
import Cart from './pages/Cart.jsx';
import EditProduct from './pages/EditProduct.jsx';
import Search from './pages/Search.jsx';
import UserId from './pages/UserId.jsx';
import Purchase from './pages/Purchase.jsx';

const router = createBrowserRouter([
  {
    element: <Layout/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "product/:idProduct",
        element: <Product />,
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path:"/register",
        element: <Register/>
      },
      {
        path:"/newProduct",
        element: <NewProduct/>
      },
      {
        path:"/categories",
        element: <Categories/>
      },
      {
        path:"/categories/:id",
        element: <Category/>
      },
      {
        path:"/user",
        element: <User/>          
        
      }, 
      {
        path:"/user/:id",
        element: <UserId/>          
        
      }, 
      {
        path:"/cart",
        element: <Cart/>
      }, 
      {
        path:"/editProduct/:id",
        element: <EditProduct/>
      },
      {
        path:"search",
        element: <Search/>
      },
      {
        path:"purchase",
        element: <Purchase/>
      }
    ]
  }

]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
