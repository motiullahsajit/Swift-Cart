import { Link } from "react-router-dom";
import ProductCard from "../components/product-card";

const Home = () => {
  const addToCartHandler = () => {};
  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>
      <main>
        <ProductCard
          productId="123df"
          name="Macbook"
          price={999}
          stock={123}
          photo="https://m.media-amazon.com/images/I/71jG+e7roXL._AC_SX522_.jpg"
          handler={addToCartHandler}
        />
      </main>
    </div>
  );
};

export default Home;
