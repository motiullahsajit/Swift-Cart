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
    <div className="admin-container flex">
      <AdminSidebar />
      <main className="flex-1 p-6">
        {isLoading ? (
          <Skeleton length={30} />
        ) : (
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            <section className="bg-white p-8 shadow-lg rounded-lg flex-1">
              <h2 className="text-center text-2xl font-bold mb-6">
                Order Items
              </h2>
              {orderItems.map((i) => (
                <ProductCard key={i._id} {...i} />
              ))}
            </section>

            <article className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md flex-1 lg:mt-0">
              <div className="flex justify-end mb-4">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={deleteHandler}
                >
                  <FaTrash />
                </button>
              </div>
              <h1 className="text-2xl font-semibold mb-4">Order Info</h1>
              <h5 className="font-medium text-lg mb-2">User Info</h5>
              <p>Name: {name}</p>
              <p>
                Address:{" "}
                {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
              </p>
              <h5 className="font-medium text-lg mb-2">Amount Info</h5>
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              <p>Shipping Charges: ${shippingCharges.toFixed(2)}</p>
              <p>Tax: ${tax.toFixed(2)}</p>
              <p>Discount: ${discount.toFixed(2)}</p>
              <p>Total: ${total.toFixed(2)}</p>

              <h5 className="font-medium text-lg mb-2">Status Info</h5>
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
              <button
                className="mt-6 bg-[#1B5A7D] hover:bg-[#1c3747] text-white py-2 px-4 rounded transition duration-300"
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
  <div className="flex items-center justify-between p-4 border-b">
    <img src={photo} alt={name} className="w-20 h-20 object-cover rounded-lg" />
    <Link to={`/product/${productId}`} className="text-lg font-medium">
      {name}
    </Link>
    <span className="text-gray-600">
      ${price} X {quantity} = ${(price * quantity).toFixed(2)}
    </span>
  </div>
);

export default TransactionManagement;
