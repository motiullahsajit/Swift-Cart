import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/store";
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
    <div className="flex items-center justify-between border-b py-6">
      <img
        src={`${server}/${photo}`}
        alt={name}
        className="w-32 h-32 object-cover rounded-lg"
      />
      <article className="flex-1 px-6">
        <Link to={`/product/${productId}`} className="text-xl font-semibold">
          {name}
        </Link>
        <span className="block text-gray-500 text-lg">${price.toFixed(2)}</span>
      </article>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => decrementHandler(cartItem)}
          className="bg-gray-300 px-3 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
        >
          -
        </button>
        <p className="text-lg">{quantity}</p>
        <button
          onClick={() => incrementHandler(cartItem)}
          className="bg-gray-300 px-3 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
        >
          +
        </button>
      </div>
      <button
        onClick={() => removeHandler(productId)}
        className="ml-6 text-red-500 hover:text-red-700 transition duration-300"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
