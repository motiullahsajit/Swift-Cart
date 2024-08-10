import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/loader";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";
import PolicyInfo from "../components/Home/PolicyInfo";
// import Reviews from "../components/Home/Reviews";
import Brands from "../components/Home/Brands";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");

  if (isError) toast.error("Cannot Fetch Products");

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of stock");
    dispatch(addToCart(cartItem));
    toast.success("Product added to cart successfully");
  };

  return (
    <div className="home">
      <section></section>
      <h1 className="pb-5">
        Latest Products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>
      <main>
        <section className="latest">
          {isLoading ? (
            <Skeleton width="80vw" />
          ) : (
            data?.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                photo={i.photo}
                handler={addToCartHandler}
              />
            ))
          )}
        </section>
        <section className="banner flex items-center justify-end px-20 h-[417px] my-10 w-[1320px] mx-auto">
          <div className="text-center mx-10">
            <h1 className="text-3xl my-5 text-white">Sale up to 50% off</h1>
            <Link
              to="/search"
              className="py-4 px-7 inline-block bg-[#EDA415] text-white rounded-2xl"
            >
              Shop Now
            </Link>
          </div>
        </section>
        <PolicyInfo />
        {/* <Reviews /> */}
        <Brands />
      </main>
    </div>
  );
};

export default Home;
