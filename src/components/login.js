import Style from "./login.module.css";
import { NavLink } from "react-router-dom";
import { useUserValue } from "../userContext";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const [username,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const handleUsername  = (e) =>{
        setUserName(e.target.value);
    };
    const handlePassword  = (e) =>{
        setPassword(e.target.value);
    };
    const {checkUser} = useUserValue();
  return (
    <>
    <ToastContainer/>
    <div className={Style["login-container"]}>
      <h2>Login</h2>
      <form className={Style["login-form"]}>
        <div className={Style["form-group"]}>
          <label htmlFor="email">Email</label>
          <input onChange={(e)=> {handleUsername(e)}} type="email" id="email" name="email" required />
        </div>
        <div className={Style["form-group"]}>
          <label htmlFor="password">Password</label>
          <input onChange={(e)=> {handlePassword(e)}} type="password" id="password" name="password" required />
        </div>
        <NavLink to="/" onClick = {()=>{checkUser(username,password)}} className={Style["login-button"]}>
          Login
        </NavLink>
        <br/>
        <NavLink to="/Signup"  className={Style["login-button"]}>
          Signup
        </NavLink>
      </form>
    </div>

    </>
    
  );
}

export default Login;