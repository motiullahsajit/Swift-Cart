import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../types/reducer-types";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
} from "../../../redux/api/productAPI";
import { server } from "../../../redux/store";
import { Skeleton } from "../../../components/loader";
import { responseToast } from "../../../utils/features";

const Productmanagement = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const params = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useProductDetailsQuery(params.id!);
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

  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [descriptionUpdate, setDescriptionUpdate] =
    useState<string>(description);
  const [photoUpdate, setPhotoUpdate] = useState<string>("");
  const [photoFile, setPhotoFile] = useState<File>();

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    if (nameUpdate) formData.set("name", nameUpdate);
    if (priceUpdate) formData.set("price", priceUpdate.toString());
    if (stockUpdate !== undefined)
      formData.set("stock", stockUpdate.toString());
    if (photoFile) formData.set("photo", photoFile);
    if (categoryUpdate) formData.set("category", categoryUpdate);
    if (descriptionUpdate) formData.set("description", descriptionUpdate);

    const res = await updateProduct({
      formData,
      userId: user?._id!,
      productId: _id,
    });

    responseToast(res, navigate, "/admin/product");
  };

  const deleteHandler = async () => {
    const res = await deleteProduct({
      userId: user?._id!,
      productId: data?.product._id!,
    });

    responseToast(res, navigate, "/admin/product");
  };

  useEffect(() => {
    if (data) {
      setNameUpdate(name);
      setPriceUpdate(price);
      setStockUpdate(stock);
      setCategoryUpdate(category);
      setDescriptionUpdate(description);
    }
  }, [data]);

  if (isError) return <Navigate to={"/404"} />;

  return (
    <div className="admin-container flex">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8 lg:p-12">
        {isLoading ? (
          <Skeleton length={40} />
        ) : (
          <>
            <section className="bg-white shadow-md rounded-lg p-6 mb-6 md:mb-12 lg:mb-16">
              <div className="flex flex-col md:flex-row items-center">
                <img
                  src={`${server}/${photo}`}
                  alt="Product"
                  className="w-full md:w-1/3 lg:w-1/4 rounded-lg mb-4 md:mb-0 object-cover"
                />
                <div className="flex-1 md:ml-6">
                  <strong className="block text-lg font-semibold mb-2">
                    ID - {_id}
                  </strong>
                  <h2 className="text-2xl font-bold mb-2">{name}</h2>
                  <p className="text-gray-700 mb-2">{description}</p>
                  <p
                    className={`text-lg ${
                      stock > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stock > 0 ? `${stock} Available` : "Not Available"}
                  </p>
                  <h3 className="text-xl font-semibold mt-2">${price}</h3>
                </div>
              </div>
            </section>
            <article className="relative bg-white shadow-md rounded-lg p-6">
              <button
                className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full mb-4 hover:bg-red-700 focus:outline-none"
                onClick={deleteHandler}
              >
                <FaTrash />
              </button>
              <form onSubmit={submitHandler} className="space-y-4">
                <h2 className="text-lg font-semibold mb-4">Manage Product</h2>
                <div className="flex flex-col">
                  <label className="text-sm font-semibold mb-1">Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={nameUpdate}
                    onChange={(e) => setNameUpdate(e.target.value)}
                    className="border rounded-lg p-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-semibold mb-1">Price</label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={priceUpdate}
                    onChange={(e) => setPriceUpdate(Number(e.target.value))}
                    className="border rounded-lg p-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-semibold mb-1">Stock</label>
                  <input
                    type="number"
                    placeholder="Stock"
                    value={stockUpdate}
                    onChange={(e) => setStockUpdate(Number(e.target.value))}
                    className="border rounded-lg p-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-semibold mb-1">Category</label>
                  <input
                    type="text"
                    placeholder="eg. laptop, camera etc"
                    value={categoryUpdate}
                    onChange={(e) => setCategoryUpdate(e.target.value)}
                    className="border rounded-lg p-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-semibold mb-1">
                    Description
                  </label>
                  <textarea
                    placeholder="Product Description"
                    value={descriptionUpdate}
                    onChange={(e) => setDescriptionUpdate(e.target.value)}
                    className="border rounded-lg p-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-semibold mb-1">Photo</label>
                  <input
                    type="file"
                    onChange={changeImageHandler}
                    className="border rounded-lg p-2"
                  />
                </div>
                {photoUpdate && (
                  <img
                    src={photoUpdate}
                    alt="New Image"
                    className="w-24 h-24 rounded-lg mt-4 object-cover"
                  />
                )}
                <button
                  type="submit"
                  className="w-full bg-[#1B5A7D] text-white p-3 rounded hover:bg-[#1c3747]"
                >
                  Update
                </button>
              </form>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

export default Productmanagement;
