import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../components/admin/TableHOC";
import { Skeleton } from "../components/loader";
import { useMyOrdersQuery } from "../redux/api/orderAPI";
import { CustomError } from "../types/api-types";
import { RootState } from "../redux/store";
import { FaShoppingCart } from "react-icons/fa";

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  orderItems: string;
};

const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Items",
    accessor: "orderItems",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

const Orders = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, isError, error, data } = useMyOrdersQuery(user?._id!);

  const [rows, setRows] = useState<DataType[]>([]);

  useEffect(() => {
    if (isError) {
      toast.error((error as CustomError).data.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (data) {
      setRows(
        data.orders.map((i) => ({
          _id: i._id,
          amount: i.total,
          discount: i.discount,
          quantity: i.orderItems.length,
          status: (
            <span
              className={
                i.status === "Processing"
                  ? "text-red-500"
                  : i.status === "Shipped"
                  ? "text-green-500"
                  : "text-purple-500"
              }
            >
              {i.status}
            </span>
          ),
          orderItems: i.orderItems.map((item) => item.name).join(", "),
        }))
      );
    }
  }, [data]);

  const Table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "My Orders",
    rows.length > 6
  )();

  return (
    <div className="container mx-auto px-4 py-6">
      <main>
        {isLoading ? (
          <Skeleton length={20} />
        ) : rows.length > 0 ? (
          Table
        ) : (
          <div className="flex flex-col items-center justify-center p-6 border rounded-lg shadow-lg bg-white min-h-[300px]">
            <FaShoppingCart className="text-gray-400 text-6xl mb-4" />
            <p className="text-center text-gray-600 text-lg font-semibold">
              You haven't placed any orders yet.
            </p>
            <p className="text-center text-gray-500 mt-2">
              Start exploring our products and place your first order!
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Orders;
