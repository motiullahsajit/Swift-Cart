import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { Skeleton } from "../../components/loader";
import { useAllOrdersQuery } from "../../redux/api/orderAPI";
import { CustomError } from "../../types/api-types";
import { UserReducerInitialState } from "../../types/reducer-types";

interface DataType {
  _id: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Transaction = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const { isLoading, isError, error, data } = useAllOrdersQuery(user?._id!);

  if (isError) toast.error((error as CustomError).data.message);

  const [rows, setRows] = useState<DataType[]>([]);

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
              className={`${
                i.status === "Processing"
                  ? "text-red-500"
                  : i.status === "Shipped"
                  ? "text-green-500"
                  : "text-purple-500"
              }`}
            >
              {i.status}
            </span>
          ),
          action: (
            <Link
              to={`/admin/transaction/${i._id}`}
              className="bg-[#1B5A7D] text-white py-1 px-3 rounded hover:bg-[#1c3747] transition duration-200"
            >
              Manage
            </Link>
          ),
        }))
      );
    }
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Orders",
    rows.length > 6
  )();
  return (
    <div className="admin-container flex flex-col md:flex-row p-2">
      <AdminSidebar />
      <main className="flex-1 p-2">
        {isLoading ? <Skeleton length={20} /> : Table}
      </main>
    </div>
  );
};

export default Transaction;
