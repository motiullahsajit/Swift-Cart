import { useParams } from "react-router-dom";
import { useProductDetailsQuery } from "../redux/api/productAPI";
import { Skeleton } from "../components/loader";
import { server } from "../redux/store";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

/**
 * Component that renders the product details page.
 */
const ProductDetails = () => {
  const id = useParams().id;

  const { data, isLoading } = useProductDetailsQuery(id!);

  const { _id, price, photo, name, stock, category } = data?.product || {
    _id: "",
    name: "",
    photo: "",
    category: "",
    stock: 0,
    price: 0,
  };

  return (
    <div>
      {isLoading ? (
        <Skeleton length={40} />
      ) : (
        <>
          <section className="w-[1320px] mx-auto">
            <div className="flex justify-around ">
              <img src={`${server}/${photo}`} width={500} height={500} alt="" />
              <div className="w-[500px] px-5 pt-20">
                <h1 className="text-4xl mb-3">{name}</h1>
                <h2 className="text-2xl mb-3">Tk {price}</h2>
                <p className="mb-3">Category: {category}</p>
                <p className="mb-3">
                  Availablity:{" "}
                  {stock ? (
                    <span className="text-green-600">In Stock</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </p>
                <p className="text-sm mb-4">
                  Hurry up only {stock} product left in stock
                </p>
                <hr className="mb-4" />
                <h2 className="flex items-center gap-3">
                  Rating:
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStarHalfAlt className="text-yellow-500" />
                </h2>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
