import { server } from "../redux/store";
import { CartItem } from "../types/types";
import { Link } from "react-router-dom";

type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  handler: (cartItem: CartItem) => string | undefined;
  isInCart: boolean;
};

const ProductCard = ({
  productId,
  photo,
  name,
  price,
  stock,
  description,
  handler,
  isInCart,
}: ProductsProps) => {
  return (
    <div className="flex flex-col items-center w-full max-w-sm p-4 bg-white rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:shadow-xl hover:scale-105">
      <Link
        to={`/product/${productId}`}
        className="w-full h-48 overflow-hidden rounded-t-lg"
      >
        <img
          src={`${server}/${photo}`}
          alt={name}
          className="object-cover w-full h-full"
        />
      </Link>
      <div className="flex flex-col items-start justify-center w-full mt-4 px-2">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{name}</h3>
        <span className="text-xl font-semibold text-gray-900 mb-2">
          ${price.toFixed(2)}
        </span>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-center w-full">
          <button
            className={`w-full px-4 py-2 text-white rounded-lg ${
              isInCart
                ? "bg-gray-500 hover:bg-gray-600"
                : "bg-[#003F62] hover:bg-[#002a4d]"
            } transition-colors duration-200`}
            onClick={() =>
              !isInCart &&
              handler({
                productId,
                photo,
                name,
                price,
                stock,
                quantity: 1,
              })
            }
          >
            {isInCart ? "Already Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
