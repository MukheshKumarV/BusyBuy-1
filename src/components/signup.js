import styles from "./signup.module.css";
import { useUserValue } from '../userContext';
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const{newUser} = useUserValue();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const handleUsernameChange = (e)=>{
        setName(e.target.value);
    }
    const handlePasswordChange = (e)=>{
        setPassword(e.target.value);
    }
    const handleEmailChange= (e)=>{
        setEmail(e.target.value);
    }
  return (
    <>
    <ToastContainer/>
    <div className={styles.container}>
      <h1 className={styles.title}>Signup</h1>
      <form className={styles.form}>
        <label className={styles.label} htmlFor="username">Name:</label>
        <input  onChange={(e)=>handleUsernameChange(e)} className={styles.input} type="text" id="username" />

        <label className={styles.label} htmlFor="email">Email:</label>
        <input onChange={(e)=>handleEmailChange(e)} className={styles.input} type="email" id="email" />

        <label className={styles.label} htmlFor="password">Password:</label>
        <input onChange={(e)=>handlePasswordChange(e)} className={styles.input} type="password" id="password" />

        <NavLink to="/" onClick = {()=>{newUser(name,email,password)}} className={styles["login-button"]}>
          Sign Up
        </NavLink>
      </form>
    </div>

    </>
    
  );
};

export default SignUp;
