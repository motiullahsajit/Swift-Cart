import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import {
  useDeleteOrderMutation,
  useOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../../redux/api/orderAPI";
import { UserReducerInitialState } from "../../../types/reducer-types";
import { Order, OrderItem } from "../../../types/types";
import { Skeleton } from "../../../components/loader";
import { responseToast } from "../../../utils/features";

const defaultData: Order = {
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
  status: "",
  subtotal: 0,
  discount: 0,
  shippingCharges: 0,
  tax: 0,
  total: 0,
  orderItems: [],
  user: {
    name: "",
    _id: "",
  },
  _id: "",
};

const TransactionManagement = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const params = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, data } = useOrderDetailsQuery(params?.id!);
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const {
    shippingInfo: { address, city, state, country, pinCode },
    orderItems,
    user: { name },
    status,
    tax,
    subtotal,
    total,
    discount,
    shippingCharges,
  } = data?.order || defaultData;

  const updateHandler = async () => {
    const res = await updateOrder({
      userId: user?._id!,
      orderId: data?.order._id!,
    });
    responseToast(res, navigate, "/admin/transaction");
  };

  const deleteHandler = async () => {
    const res = await deleteOrder({
      userId: user?._id!,
      orderId: data?.order._id!,
    });
    responseToast(res, navigate, "/admin/transaction");
  };

  if (isError) return <Navigate to={"/404"} />;

  return (
    <div className="admin-container flex min-h-screen">
      <AdminSidebar />
      <main className="product-management flex-1 p-6 bg-gray-50">
        {isLoading ? (
          <Skeleton length={30} />
        ) : (
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            <section className="bg-white p-8 shadow-lg rounded-lg flex-1 mb-8 lg:mb-0">
              <h2 className="text-center text-2xl font-bold mb-6 text-[#1B5A7D]">
                Order Items
              </h2>
              {orderItems.map((i) => (
                <ProductCard key={i._id} {...i} />
              ))}
            </section>

            <article className="p-6 bg-white rounded-lg shadow-md flex-1">
              <div className="flex justify-end mb-4">
                <button
                  className="text-red-500 hover:text-red-700 transition duration-200"
                  onClick={deleteHandler}
                  aria-label="Delete Order"
                >
                  <FaTrash />
                </button>
              </div>
              <h1 className="text-2xl font-semibold mb-6 text-[#1B5A7D]">
                Order Info
              </h1>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <h5 className="font-medium text-lg mb-3 text-[#005777]">
                    User Info
                  </h5>
                  <p className="mb-2">Name: {name}</p>
                  <p className="mb-5">
                    Address:{" "}
                    {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-lg mb-3 text-[#005777]">
                    Amount Info
                  </h5>
                  <p className="mb-2">Subtotal: ${subtotal.toFixed(2)}</p>
                  <p className="mb-2">
                    Shipping Charges: ${shippingCharges.toFixed(2)}
                  </p>
                  <p className="mb-2">Tax: ${tax.toFixed(2)}</p>
                  <p className="mb-2">Discount: ${discount.toFixed(2)}</p>
                  <p className="mb-5">Total: ${total.toFixed(2)}</p>
                </div>
              </div>
              <div className="mt-6">
                <h5 className="font-medium text-lg mb-3 text-[#005777]">
                  Status Info
                </h5>
                <p>
                  Status:{" "}
                  <span
                    className={
                      status === "Delivered"
                        ? "text-purple-500"
                        : status === "Shipped"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {status}
                  </span>
                </p>
              </div>
              <button
                className="mt-8 bg-[#1B5A7D] hover:bg-[#1c3747] text-white py-2 px-6 rounded transition duration-300"
                onClick={updateHandler}
              >
                Process Status
              </button>
            </article>
          </div>
        )}
      </main>
    </div>
  );
};

const ProductCard = ({
  name,
  photo,
  price,
  quantity,
  productId,
}: OrderItem) => (
  <div className="flex items-center justify-between p-4 border-b last:border-0 bg-gray-50 rounded-lg shadow-md">
    <img src={photo} alt={name} className="w-20 h-20 object-cover rounded-lg" />
    <Link
      to={`/product/${productId}`}
      className="text-lg font-medium text-[#1B5A7D] hover:underline"
    >
      {name}
    </Link>
    <span className="text-gray-600">
      ${price} x {quantity} = ${(price * quantity).toFixed(2)}
    </span>
  </div>
);

export default TransactionManagement;
