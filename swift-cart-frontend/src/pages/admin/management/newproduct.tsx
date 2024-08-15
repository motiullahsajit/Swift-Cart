import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../types/reducer-types";
import { useNewProductMutation } from "../../../redux/api/productAPI";
import { responseToast } from "../../../utils/features";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const navigate = useNavigate();
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(1000);
  const [stock, setStock] = useState<number>(1);
  const [description, setDescription] = useState<string>("");
  const [photoPrev, setPhotoPrev] = useState<string>("");
  const [photo, setPhoto] = useState<File>();

  const [newProduct] = useNewProductMutation();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoPrev(reader.result);
          setPhoto(file);
        }
      };
    }
  };

  const uploadImageToImgBB = async (imageFile: File) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=a02776d30dbf5d3144e198ba292d1b5f`,
        formData
      );

      return response.data.data.url;
    } catch (error) {
      console.error("Error uploading to ImgBB", error);
      throw error;
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !price || stock < 0 || !category || !photo || !description)
      return;

    try {
      const photoUrl = await uploadImageToImgBB(photo);
      const formData = new FormData();

      formData.set("name", name);
      formData.set("price", price.toString());
      formData.set("stock", stock.toString());
      formData.set("photo", photoUrl);
      formData.set("category", category);
      formData.set("description", description);

      const res = await newProduct({ id: user?._id!, formData });

      responseToast(res, navigate, "/admin/product");
    } catch (error) {
      console.error("Error uploading product", error);
    }
  };

  return (
    <div className="admin-container bg-gray-100 min-h-screen">
      <AdminSidebar />
      <main className="product-management flex flex-col items-center justify-center py-10">
        <article className="bg-white shadow-md rounded p-6 max-w-lg mx-auto w-full">
          <form onSubmit={submitHandler} className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-center mb-4 text-[#1B5A7D]">
              New Product
            </h2>
            <div className="flex flex-col gap-1">
              <label className="text-gray-700">Name</label>
              <input
                required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-700">Price</label>
              <input
                required
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-700">Stock</label>
              <input
                required
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-700">Category</label>
              <input
                required
                type="text"
                placeholder="e.g., laptop, camera"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0f628e]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-700">Description</label>
              <textarea
                required
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0f628e]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-700">Photo</label>
              <input
                required
                type="file"
                onChange={changeImageHandler}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0f628e]"
              />
            </div>

            {photoPrev && (
              <img
                src={photoPrev}
                alt="Preview"
                className="w-32 h-32 object-cover rounded mt-4"
              />
            )}
            <button
              type="submit"
              className="bg-[#1B5A7D] hover:bg-[#0f628e] text-white rounded py-2 mt-4 transition duration-200"
            >
              Create
            </button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
