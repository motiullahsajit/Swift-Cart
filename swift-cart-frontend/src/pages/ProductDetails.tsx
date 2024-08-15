import { useParams } from "react-router-dom";
import { useProductDetailsQuery } from "../redux/api/productAPI";
import { Skeleton } from "../components/loader";
import { server } from "../redux/store";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../types/types";
import toast from "react-hot-toast";
import { addToCart } from "../redux/reducer/cartReducer";
import ProductReel from "../components/productReel";
import { RootState } from "../redux/store";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useProductDetailsQuery(id!);
  const cartItems = useSelector(
    (state: RootState) => state.cartReducer.cartItems
  );

  const { _id, price, photo, name, stock, category, description } =
    data?.product || {
      _id: "",
      name: "",
      photo: "",
      category: "",
      stock: 0,
      price: 0,
      description: "",
    };

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of stock");
    dispatch(addToCart(cartItem));
    toast.success("Product added to cart successfully");
  };

  const isProductInCart = (productId: string) => {
    return cartItems.some((item) => item.productId === productId);
  };

  return (
    <div className="px-4 py-10 lg:py-20">
      {isLoading ? (
        <Skeleton length={40} />
      ) : (
        <>
          <section className="max-w-[1320px] mx-auto">
            <div className="flex flex-col lg:flex-row justify-around gap-10">
              <img
                src={`${server}/${photo}`}
                className="w-full max-w-[500px] h-auto rounded-lg shadow-lg"
                alt={name}
              />
              <div className="w-full lg:w-[500px] px-4 lg:px-5 pt-10 lg:pt-20">
                <h1 className="text-3xl lg:text-4xl font-bold mb-3 text-gray-800">
                  {name}
                </h1>
                <h2 className="text-2xl lg:text-3xl font-semibold mb-3 text-[#EDA415]">
                  Tk {price}
                </h2>
                <div className="flex items-center mb-3 gap-1 lg:gap-3">
                  <span className="text-xl lg:text-2xl text-gray-600">
                    Rating:
                  </span>
                  <FaStar className="text-yellow-500 text-xl lg:text-2xl" />
                  <FaStar className="text-yellow-500 text-xl lg:text-2xl" />
                  <FaStar className="text-yellow-500 text-xl lg:text-2xl" />
                  <FaStar className="text-yellow-500 text-xl lg:text-2xl" />
                  <FaStarHalfAlt className="text-yellow-500 text-xl lg:text-2xl" />
                </div>
                <p className="mb-3 text-lg text-gray-700">
                  Availability:{" "}
                  {stock ? (
                    <span className="text-green-600">In Stock</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </p>
                <p className="text-sm lg:text-base mb-4 text-gray-600">
                  Hurry up! Only {stock} product{stock > 1 ? "s" : ""} left in
                  stock.
                </p>
                <hr className="mb-4 border-gray-300" />
                <p className="text-lg lg:text-xl mb-3 text-gray-800">
                  Category: <span className="font-semibold">{category}</span>
                </p>
                <p className="text-lg lg:text-xl mb-5 text-gray-800">
                  Description:{" "}
                  <span className="font-normal">{description}</span>
                </p>
                <button
                  className={`h-[40px] w-full lg:w-[200px] ${
                    isProductInCart(_id)
                      ? "bg-gray-500 hover:bg-gray-600"
                      : "bg-[#003F62] hover:bg-[#002a4d]"
                  } transition-all duration-300 text-white font-semibold text-lg px-3 rounded-lg shadow-lg`}
                  onClick={() =>
                    !isProductInCart(_id) &&
                    addToCartHandler({
                      productId: _id,
                      photo,
                      name,
                      price,
                      stock,
                      quantity: 1,
                    })
                  }
                >
                  {isProductInCart(_id) ? "Already Added" : "Add to Cart"}
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      <ProductReel type="Similar Products" category={category} />
    </div>
  );
};

export default ProductDetails;
