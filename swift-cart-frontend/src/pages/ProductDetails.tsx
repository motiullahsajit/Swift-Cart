import { useParams } from "react-router-dom";
import { useProductDetailsQuery } from "../redux/api/productAPI";
import { Skeleton } from "../components/loader";
import { server } from "../redux/store";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { CartItem } from "../types/types";
import toast from "react-hot-toast";
import { addToCart } from "../redux/reducer/cartReducer";

/**
 * Component that renders the product details page.
 */
const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useProductDetailsQuery(id!);

  // Extract product details including the description
  const { _id, price, photo, name, stock, category, description } =
    data?.product || {
      _id: "",
      name: "",
      photo: "",
      category: "",
      stock: 0,
      price: 0,
      description: "", // Initialize description
    };

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of stock");
    dispatch(addToCart(cartItem));
    toast.success("Product added to cart successfully");
  };

  return (
    <div>
      {isLoading ? (
        <Skeleton length={40} />
      ) : (
        <>
          <section className="w-[1320px] mx-auto">
            <div className="flex justify-around ">
              <img
                src={`${server}/${photo}`}
                width={500}
                height={500}
                alt={name}
              />
              <div className="w-[500px] px-5 pt-20">
                <h1 className="text-4xl mb-3">{name}</h1>
                <h2 className="text-2xl mb-3">Tk {price}</h2>
                <h2 className="flex items-center mb-3 gap-3">
                  Rating:
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStarHalfAlt className="text-yellow-500" />
                </h2>
                <p className="mb-3">
                  Availablity:{" "}
                  {stock ? (
                    <span className="text-green-600">In Stock</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </p>
                <p className="text-sm mb-4">
                  Hurry up only {stock} product{stock > 1 ? "s" : ""} left in
                  stock
                </p>
                <hr className="mb-4" />
                <p className="mb-3">Category: {category}</p>
                <p className="mb-3">Description: {description}</p>{" "}
                {/* Display the description */}
                <button
                  className="h-[40px] w-[125px] bg-[#EDA415] block text-white px-3 py-1 rounded-lg"
                  onClick={() =>
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
                  Add to Cart
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
