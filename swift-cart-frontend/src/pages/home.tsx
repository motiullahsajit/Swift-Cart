import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/loader";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";
import { FaBox, FaCrown, FaShippingFast } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";

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
        <section>
          <div className="flex justify-around items-center w-[1328px] h-[155px] mx-auto bg-[#E2F4FF] rounded-2xl">
            <div className="flex gap-4 justify-center items-center">
              <FaShippingFast className="text-5xl text-[#EDA415]" />
              <div>
                <h1 className="text-3xl text-[#003F62]">Free Delivery</h1>
                <p className="text-lg text-[#003F62]">
                  on order above Tk 10000
                </p>
              </div>
            </div>
            <div className="flex gap-4 justify-center items-center">
              <FaCrown className="text-5xl text-[#EDA415]" />
              <div>
                <h1 className="text-3xl text-[#003F62]">Best Quality</h1>
                <p className="text-lg text-[#003F62]">at low price</p>
              </div>
            </div>
            <div className="flex gap-4 justify-center items-center">
              <IoShieldCheckmark className="text-5xl text-[#EDA415]" />
              <div>
                <h1 className="text-3xl text-[#003F62]">1 Year Warranty</h1>
                <p className="text-lg text-[#003F62]">Available warrenty </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
