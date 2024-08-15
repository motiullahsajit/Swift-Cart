import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartItem as CartItemType } from "../types/types";

type CartItemProps = {
  cartItem: CartItemType;
  incrementHandler: (cartItem: CartItemType) => void;
  decrementHandler: (cartItem: CartItemType) => void;
  removeHandler: (id: string) => void;
};

const CartItem = ({
  cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler,
}: CartItemProps) => {
  const { productId, name, photo, price, quantity } = cartItem;
  return (
    <div className="flex flex-col md:flex-row items-center justify-between border-b py-6 space-y-4 md:space-y-0 md:space-x-4">
      <img
        src={`${photo}`}
        alt={name}
        className="w-24 h-24 object-cover rounded-lg"
      />
      <article className="flex-1 px-4 text-center md:text-left">
        <Link to={`/product/${productId}`} className="text-lg font-semibold">
          {name}
        </Link>
        <span className="block text-gray-500 text-md">${price.toFixed(2)}</span>
      </article>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => decrementHandler(cartItem)}
          className="bg-gray-300 px-2 py-1 rounded-lg hover:bg-gray-400 transition duration-300"
        >
          -
        </button>
        <p className="text-lg">{quantity}</p>
        <button
          onClick={() => incrementHandler(cartItem)}
          className="bg-gray-300 px-2 py-1 rounded-lg hover:bg-gray-400 transition duration-300"
        >
          +
        </button>
      </div>
      <button
        onClick={() => removeHandler(productId)}
        className="text-red-500 hover:text-red-700 transition duration-300"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
