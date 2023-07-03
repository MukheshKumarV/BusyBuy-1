import style from "./home.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-spinner-material';
import { useEffect, useState } from "react";
import { useUserValue } from "../userContext";

const Home = () => {
  const [priceFilter, setPriceFilter] = useState(1000);
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const {setUserCart,cart} = useUserValue();

  const handlePriceChange = (e) => {
    setPriceFilter(Number(e.target.value));
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddCart = (id) => {
  let alreadyInCart = cart.find((p) => p.id === id);
  let newCartProduct = products.find((p) => p.id === id);

  if (alreadyInCart) {
    setUserCart(
      cart.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
    toast.info('🦄 Added to Cart', {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
  } else {
    newCartProduct.count = 1;
    setUserCart([...cart, newCartProduct]);
    toast.info('🦄 Added to Cart', {
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
};


  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
      </div>
    );
  }

  const filteredProducts = products.filter((product) => {
  const matchCategory = category === "" || product.category.toLowerCase() === category.toLowerCase();
  const matchSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
  const matchPrice = product.price <= priceFilter;
  return matchCategory && matchSearch && matchPrice;
});


  return (
    <>
    <ToastContainer/>
    <div className={style["container"]}>
      <div className={style["top-row"]}>
        <div className={style["search-container"]}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <button type="submit">Search</button>
        </div>
        <h1 className={style["toping"]}>Items</h1>
        <div className={style['filter-container']}>
          <select onChange={handleCategoryChange} className={style.dropdown}>
            <option value="">Filter by Category</option>
            <option value="Men's Clothing">Men's Clothing</option>
            <option value="Women's Clothing">Women's Clothing</option>
            <option value="jewelery">Jewelry</option>
            <option value="Electronics">Electronics</option>
          </select>
          <label htmlFor="price">Price:<span>${priceFilter}</span></label>
          <input
            type="range"
            min="1"
            max="1000"
            step="20"
            name="price"
            id="price"
            value={priceFilter}
            onChange={handlePriceChange}
          />
        </div>
      </div>

      <section className={style["product-list"]}>
        {filteredProducts.map((product) => (
          <div className={style["product-item"]} key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button onClick={() => {handleAddCart(product.id)}} >Add to Cart</button>
          </div>
        ))}
      </section>
    </div>
    </>
  );
};

export default Home;
