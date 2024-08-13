import { Link } from "react-router-dom";
import { Skeleton } from "./loader";
import ProductCard from "./product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { CartItem } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";

const ProductReel = ({ type, category }: any) => {
  const { data, isLoading, isError } = useLatestProductsQuery(category);

  if (isError) toast.error("Cannot Fetch Products");
  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of stock");
    dispatch(addToCart(cartItem));
    toast.success("Product added to cart successfully");
  };

  return (
    <section className="px-20 my-16">
      <div className="flex justify-between items-center my-6">
        <h1 className="text-2xl font-semibold text-gray-800">{type}</h1>
        <Link to="/search" className="text-blue-500 hover:underline">
          More
        </Link>
      </div>
      <div className="latest grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {isLoading ? (
          <Skeleton width="100%" />
        ) : (
          data?.products.map((i: any) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              name={i.name}
              price={i.price}
              stock={i.stock}
              photo={i.photo}
              description={i.description}
              handler={addToCartHandler}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default ProductReel;