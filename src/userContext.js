import { useState, useContext, createContext } from "react";
import {db} from "./firebaseinit";
import {doc,addDoc,collection,getDocs,updateDoc} from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const userContext = createContext();

export const useUserValue = () => {
    const value = useContext(userContext);
    return value;
}

export const UserContextProvider = (props) =>{
    const [userStatus,setUserStatus] = useState(false);
    const [cart,setCart] = useState([]);
    const [userOrders,setUserOrders] = useState([]);
    const currentDate = new Date();
    const year = currentDate.getFullYear(); 
    const month = currentDate.getMonth()+1; 
    const date = currentDate.getDate();
    const [userId,setUserId] = useState("");

    const checkUser = async (email, password) => {
        const users = collection(db, "users");
        const querySnapshot = await getDocs(users);
            querySnapshot.forEach((doc) => {
                if (doc.data().email === email && doc.data().password === password) {
                        setUserId(doc.id);
                        setUserOrders(doc.data().orders);
                        setUserCart(doc.data().cart);
                        setUserStatus(true);
                        toast.info('🦄 Logged In', {
                                position: "top-center",
                                autoClose: 1000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                                });
        }});
    };

    const newUser = async(name,email,password) => {
        const user ={
            name:name,
            email:email,
            password:password,
            cart:[],
            orders:[]
        }
        const userRef = collection(db, "users");
        const docRef = await addDoc(userRef, user);
        toast.info('🦄 New User Added', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
    }

    const logOut = async() => {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
        orders: userOrders,
        cart:cart
        });
        setUserStatus(false);
        toast.info('🦄 Successfully Logged out', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }

    const setUserCart = (cart) =>{
        setCart(cart);
    };

    const removeFromCart = (id) =>{
        let newCart =cart.filter((p)=>p.id !== id);
        setCart(newCart);
        toast.info('🦄 Removed from Cart', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }

    const onCheckout = () =>{
        let orderDate = date.toString()+'-'+month.toString()+'-'+year.toString();
        let newOrder = {date:orderDate,order:cart};
        setUserOrders([newOrder,...userOrders]);
        console.log(userOrders);
        setCart([]);
        toast.info('🦄 Order Successful', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
    };

    return (
        <userContext.Provider value={{newUser,userStatus,checkUser,logOut,setUserCart,cart,removeFromCart,onCheckout,userOrders}}>
        {props.children}
        </userContext.Provider>
    );
}