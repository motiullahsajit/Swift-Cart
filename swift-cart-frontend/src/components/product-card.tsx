import { server } from "../redux/store";
import { CartItem } from "../types/types";
import { Link } from "react-router-dom";

type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
};
const ProductCard = ({
  productId,
  photo,
  name,
  price,
  stock,
  handler,
}: ProductsProps) => {
  return (
    <div className="product-card">
      <img src={`${server}/${photo}`} alt={name} />
      <p>{name}</p>
      <span>${price}</span>
      <div className="flex w-full justify-around">
        <button
          className="h-[40px] w-[125px] bg-[#003F62] block text-gray-200 px-3 py-1 rounded-lg"
          onClick={() =>
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
          Add to Cart
        </button>
        <Link
          to={`/product/${productId}`}
          className="h-[40px] w-[130px] border-2 border-[#003F62] block px-3 py-1 rounded-lg text-center text-xl"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
