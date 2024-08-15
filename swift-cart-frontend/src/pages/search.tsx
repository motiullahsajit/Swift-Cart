import { useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/product-card";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productAPI";
import { CustomError } from "../types/api-types";
import toast from "react-hot-toast";
import { Skeleton } from "../components/loader";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";
import { RootState } from "../redux/store";

const Search = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initialCategory = query.get("category");

  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError,
    error,
  } = useCategoriesQuery("");

  const [productSearch, setProductSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(500000);
  const [category, setCategory] = useState(
    initialCategory && initialCategory !== "latest" ? initialCategory : ""
  );
  const [page, setPage] = useState(1);

  const {
    data: searchData,
    isLoading: productsLoading,
    isError: productIsError,
    error: productError,
  } = useSearchProductsQuery({
    search: productSearch,
    sort,
    page,
    category,
    price: maxPrice,
  });

  const dispatch = useDispatch();
  const cartItems = useSelector(
    (state: RootState) => state.cartReducer.cartItems
  );

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of stock");
    dispatch(addToCart(cartItem));
    toast.success("Product added to cart successfully");
  };

  const isProductInCart = (productId: string) => {
    return cartItems.some((item) => item.productId === productId);
  };

  const totalPage = searchData?.totalPage ?? 1;
  const isPrevPage = page > 1;
  const isNextPage = page < totalPage;

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  if (productIsError) {
    const err = productError as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className="product-search-page flex flex-col lg:flex-row gap-4 px-4 lg:px-20 py-10 mb-10">
      <aside className="w-full lg:w-1/4 p-4 bg-gray-100 rounded-lg">
        <div className="space-y-4">
          <h2 className="text-xl lg:text-2xl font-semibold mb-4">Filters</h2>
          <div>
            <h4 className="font-medium mb-2">Sort</h4>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">NONE</option>
              <option value="asc">Price (Low to High)</option>
              <option value="dsc">Price (High to Low)</option>
            </select>
          </div>
          <div>
            <h4 className="font-medium mb-2">Max Price: {maxPrice || ""}</h4>
            <input
              type="range"
              min={100}
              max={500000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <h4 className="font-medium mb-2">Category</h4>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">ALL</option>
              {!loadingCategories &&
                categoriesResponse?.categories.map((i) => (
                  <option key={i} value={i}>
                    {i.toUpperCase()}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </aside>

      <main className="w-full lg:w-3/4">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        {productsLoading ? (
          <Skeleton length={20} />
        ) : (
          <div className="search-product-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
            {searchData?.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                photo={i.photo}
                description={i.description}
                handler={addToCartHandler}
                isInCart={isProductInCart(i._id)}
              />
            ))}
          </div>
        )}
        {searchData && totalPage > 1 && (
          <article className="flex justify-between items-center mt-4">
            <button
              disabled={!isPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
              className={`px-4 py-2 border rounded-lg ${
                !isPrevPage
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-[#003F62] text-white hover:bg-[#002a4d]"
              }`}
            >
              Prev
            </button>
            <span className="text-lg">
              {page} of {totalPage}
            </span>
            <button
              disabled={!isNextPage}
              onClick={() => setPage((prev) => prev + 1)}
              className={`px-4 py-2 border rounded-lg ${
                !isNextPage
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-[#003F62] text-white hover:bg-[#002a4d]"
              }`}
            >
              Next
            </button>
          </article>
        )}
      </main>
    </div>
  );
};

export default Search;
