import { useState, useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import toast from "react-hot-toast";
import { server } from "../../redux/store";
import { FiTrash2 } from "react-icons/fi";
import { Skeleton } from "../../components/loader";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../types/reducer-types";

interface Coupon {
  _id: string;
  code: string;
  amount: number;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  coupons?: Coupon[];
}

const Coupon = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [newCoupon, setNewCoupon] = useState({ code: "", amount: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCoupons = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${server}/api/v1/payment/coupon/all?id=${user?._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data: ApiResponse = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch coupons");
      setCoupons(data.coupons || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createCoupon = async () => {
    if (!newCoupon.code || !newCoupon.amount) {
      toast.error("Please fill in both code and amount.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${server}/api/v1/payment/coupon/new?id=${user?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCoupon),
        }
      );
      const data: ApiResponse = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to create coupon");
      toast.success(data.message || "Coupon created successfully");
      setNewCoupon({ code: "", amount: 0 });
      fetchCoupons();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteCoupon = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${server}/api/v1/payment/coupon/${id}?id=${user?._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data: ApiResponse = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to delete coupon");
      toast.success(data.message || "Coupon deleted successfully");
      fetchCoupons();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row admin-container">
      <AdminSidebar />
      <main className="dashboard flex-1 p-6 bg-gray-100">
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#1B5A7D] ">
            Create New Coupon
          </h2>
          <div className="flex flex-col lg:flex-row gap-2">
            <input
              type="text"
              placeholder="Code"
              value={newCoupon.code}
              onChange={(e) =>
                setNewCoupon({ ...newCoupon, code: e.target.value })
              }
              className="border rounded p-2 flex-1 mb-2 lg:mb-0"
            />
            <input
              type="number"
              placeholder="Amount"
              value={newCoupon.amount}
              onChange={(e) =>
                setNewCoupon({ ...newCoupon, amount: Number(e.target.value) })
              }
              className="border rounded p-2 flex-1 mb-2 lg:mb-0"
            />
            <button
              onClick={createCoupon}
              className="bg-[#1B5A7D] text-white px-4 py-2 rounded hover:bg-[#002a4d] transition"
            >
              Create
            </button>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-[#1B5A7D]">
          Coupons List
        </h2>
        {loading ? (
          <Skeleton />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : coupons.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-lg text-[#1B5A7D]">No coupons available.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b p-4">Code</th>
                  <th className="border-b p-4">Amount</th>
                  <th className="border-b p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon._id} className="hover:bg-gray-50">
                    <td className="border-b p-4">{coupon.code}</td>
                    <td className="border-b p-4">{coupon.amount}</td>
                    <td className="border-b p-4">
                      <button
                        onClick={() => deleteCoupon(coupon._id)}
                        className="text-red-500 hover:text-red-600 transition"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default Coupon;
