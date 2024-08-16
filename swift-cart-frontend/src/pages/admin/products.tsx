import { ReactElement, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useAllProductsQuery } from "../../redux/api/productAPI";
import toast from "react-hot-toast";
import { CustomError } from "../../types/api-types";
import { UserReducerInitialState } from "../../types/reducer-types";
import { useSelector } from "react-redux";
import { Skeleton } from "../../components/loader";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Products = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const { isLoading, isError, error, data } = useAllProductsQuery(user?._id!);

  const [rows, setRows] = useState<DataType[]>([]);

  if (isError) toast.error((error as CustomError).data.message);

  useEffect(() => {
    if (data) {
      setRows(
        data.products.map((i) => ({
          photo: (
            <img
              src={`${i.photo}`}
              alt={i.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
          ),
          name: i.name,
          price: i.price,
          stock: i.stock,
          action: (
            <Link
              to={`/admin/product/${i._id}`}
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
    "Products",
    rows.length > 6
  )();

  return (
    <div className="admin-container flex flex-col md:flex-row p-2">
      <AdminSidebar />
      <main className="flex-1 p-2">
        {isLoading ? <Skeleton length={20} /> : Table}
        <Link
          to="/admin/product/new"
          className="create-product-btn fixed bottom-4 right-4 bg-[#1B5A7D] text-white p-3 rounded-full shadow-lg"
        >
          <FaPlus className="text-xl" />
        </Link>
      </main>
    </div>
  );
};

export default Products;
