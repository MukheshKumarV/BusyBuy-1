import Style from "./navbar.module.css";
import homeIcon from "./images/icons8-home-30.png";
import cartIcon from "./images/icons8-cart-64.png";
import ordersIcon from "./images/icons8-logistics-64.png";
import { useUserValue } from '../userContext';
import { NavLink } from "react-router-dom";



export default function Navbar() {
  const { userStatus,logOut} = useUserValue();
  return (
    <>
      <nav className={Style["navbar"]}>
        <div className={Style["navbar-logo"]}>
            <h3>BusyBuy</h3>
        </div>
        <div className={Style["navbar-buttons"]}>
            {userStatus ? (
                  <>
                    <div className={Style["navbar-buttons-inside"]}>
                      <span><img className={Style["icon"]} src={homeIcon} alt="..." /></span>
                      <NavLink className={Style["navbar-button"]} to="/">Home</NavLink>
                    </div>
                    <div className={Style["navbar-buttons-inside"]}>
                      <span><img className={Style["icon"]} src={ordersIcon} alt="..." /></span>
                      <NavLink className={Style["navbar-button"]} to="/orders" > MyOrders</NavLink>
                    </div>
                    <div className={Style["navbar-buttons-inside"]}>
                      <span><img className={Style["icon"]} src={cartIcon} alt="..." /></span>
                      <NavLink className={Style["navbar-button"]} to='/cart' > Cart</NavLink>
                    </div>
                    <NavLink onClick={()=>{logOut()}} to="/" className={`${Style["navbar-button-log"]} ${Style["navbar-button-logout"]}`}>Logout</NavLink>
                  </>
                  ) : (
                  <>
                    <div className={Style["navbar-buttons-inside"]}>
                      <span><img className={Style["icon"]} src={homeIcon} alt="..." /></span>
                      <NavLink className={Style["navbar-button"]} to="/">Home</NavLink>
                    </div>
                    <NavLink className={`${Style["navbar-button-log"]} ${Style["navbar-button-login"]}`} to="/login">Login</NavLink>
                  </>
                  )
            }
        </div>
      </nav>
    </>
  );
}
