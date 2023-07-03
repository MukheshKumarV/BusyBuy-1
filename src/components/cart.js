import { useUserValue } from '../userContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './cart.module.css';
import { NavLink } from 'react-router-dom';
import { Navigate } from "react-router-dom";

const Cart = () => {
  const { cart,removeFromCart,onCheckout,userStatus } = useUserValue();
  if(!userStatus)
    {
      return (
    <Navigate to="/" replace={true} />
      )
    } else{
  return (
    <>
    <ToastContainer/>
    <div className={styles['cart-container']}>
      <h1>Cart</h1>
      <div className={styles['cart-items']}>
        {cart.map((product) => (
          <div className={styles['cart-item']} key={product.id}>
            <img src={product.image} alt={product.title} className={styles['product-image']} />
            <div className={styles['item-details']}>
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              <p>Count: {product.count}</p>
              <button onClick={()=>removeFromCart(product.id)} className={styles['remove-button']}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles['cart-total']}>
        <p>Total: ${cart.reduce((total, product) => total + product.price*product.count, 0)}</p>
          <NavLink to="/orders" onClick={()=>onCheckout()} className={styles['checkout-button']}>Checkout</NavLink>
          </div>
    </div>

    </>
    
  );
        }
};

export default Cart;
