import style from "./orders.module.css";
import { useUserValue } from '../userContext';
import { Navigate } from "react-router-dom";

const Orders = () => {
  const { userOrders,userStatus } = useUserValue();
  if(!userStatus){
    return (
    <Navigate to="/" replace={true} />
    )
  }else{
    return (
    <>
      <h1>My Orders</h1>
      {userOrders.map((orders) => {
        return (
          <div className={style.container}>
            <table className={style.table}>
              <caption className={style["table-title"]}>Ordered On: <span>{orders.date}</span></caption>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {orders.order.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>${item.price}</td>
                      <td>{item.count}</td>
                      <td>${item.price * item.count}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td>Total: ${orders.order.reduce((total, product) => total + product.price*product.count, 0)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </>
  );
  }
};

export default Orders;
