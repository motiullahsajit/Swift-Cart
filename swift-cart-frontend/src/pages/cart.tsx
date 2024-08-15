import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItemCard from "../components/cart-item";
import {
  addToCart,
  calculatePrice,
  discountApplied,
  removeCartItem,
} from "../redux/reducer/cartReducer";
import { CartReducerInitialState } from "../types/reducer-types";
import { CartItem } from "../types/types";
import axios from "axios";
import { server } from "../redux/store";

const Cart = () => {
  const { cartItems, subtotal, tax, total, shippingCharges, discount } =
    useSelector(
      (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
    );

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  const dispatch = useDispatch();

  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };

  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };

  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(() => {
    const { token, cancel } = axios.CancelToken.source();

    const timeOutId = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
          cancelToken: token,
        })
        .then((res) => {
          dispatch(discountApplied(res.data.discount));
          setIsValidCouponCode(true);
          dispatch(calculatePrice());
        })
        .catch(() => {
          dispatch(discountApplied(0));
          setIsValidCouponCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);
    return () => {
      clearTimeout(timeOutId);
      cancel();
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  return (
    <div className="flex flex-col lg:flex-row max-w-screen-xl mx-auto p-8 lg:space-x-12">
      <main className="flex-1">
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => (
            <CartItemCard
              key={idx}
              cartItem={i}
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              removeHandler={removeHandler}
            />
          ))
        ) : (
          <h1 className="text-center text-2xl font-semibold text-gray-600 mt-4">
            No Items Added
          </h1>
        )}
      </main>
      <aside className="lg:w-1/3 bg-white p-8 rounded-lg shadow-2xl">
        <div className="space-y-6">
          <p className="flex justify-between text-xl">
            <span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-xl">
            <span>Shipping Charges:</span>{" "}
            <span>${shippingCharges.toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-xl">
            <span>Tax:</span> <span>${tax.toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-xl text-red-600">
            <span>Discount:</span> <em>- ${discount.toFixed(2)}</em>
          </p>
          <p className="flex justify-between text-2xl font-bold">
            <span>Total:</span> <span>${total.toFixed(2)}</span>
          </p>
        </div>
        <div className="mt-8">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c3747]"
            placeholder="Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          {couponCode &&
            (isValidCouponCode ? (
              <span className="text-green-600 mt-2 block">
                ${discount.toFixed(2)} off using <code>{couponCode}</code>
              </span>
            ) : (
              <span className="text-red-600 mt-2 flex items-center">
                <VscError />
                Invalid Coupon Code
              </span>
            ))}
        </div>
        {cartItems.length > 0 && (
          <Link
            to="/shipping"
            className="block mt-8 text-center bg-[#1B5A7D] hover:bg-[#0f628e] text-white font-semibold py-3 rounded-lg transition-all duration-300"
          >
            Checkout
          </Link>
        )}
      </aside>
    </div>
  );
};

export default Cart;
