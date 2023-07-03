import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContextProvider } from './userContext';

import Navbar from './components/navbar';
import Login from './components/login';
import Home from './components/home';
import Cart from './components/cart';
import Orders from './components/orders';
import SignUp from './components/signup';

import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";

export default function App(){

  const router = createBrowserRouter([
    {
      path:"/",
      element:(
        <UserContextProvider>
          <Navbar/>
          <Home/>
        </UserContextProvider>
      )
    },
    {
      path:"/login",
      element:(
        <UserContextProvider>
          <Navbar/>
          <Login/>
        </UserContextProvider>
      )
    },
    {
      path:"/cart",
      element:(
        <UserContextProvider>
          <Navbar/>
          <Cart/>
        </UserContextProvider>
      )
    },
    {
      path:"/orders",
      element:(
        <UserContextProvider>
          <Navbar/>
          <Orders/>
        </UserContextProvider>
      )
    },
    {
      path:"/signup",
      element:(
        <UserContextProvider>
          <Navbar/>
          <SignUp/>
        </UserContextProvider>
      )
    }
  ]);
    
    useEffect(()=>{toast.info('🦄 welcome', {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });}
    ,[]);
  return (
    <div>
    <ToastContainer/>
   <RouterProvider router={router}/>
    
    </div>
  );
}
