import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { DoughnutChart, PieChart } from "../../../components/admin/Charts";
import { Skeleton } from "../../../components/loader";
import { usePieQuery } from "../../../redux/api/dashboardAPI";
import { RootState } from "../../../redux/store";

const PieCharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, isError } = usePieQuery(user?._id!);

  const order = data?.charts.orderFulfillment!;
  const categories = data?.charts.productCategories!;
  const stock = data?.charts.stockAvailability!;
  const revenue = data?.charts.revenueDistribution!;
  const ageGroup = data?.charts.usersAgeGroup!;
  const adminAndCustomers = data?.charts.adminAndCustomers!;

  if (isError) return <Navigate to={"/admin/dashboard"} />;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <section className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-center">
                <PieChart
                  labels={["Processing", "Shipped", "Delivered"]}
                  data={[order.processing, order.shipped, order.delivered]}
                  backgroundColor={[
                    `hsl(110,80%, 80%)`,
                    `hsl(110,80%, 50%)`,
                    `hsl(110,40%, 50%)`,
                  ]}
                  offset={[0, 0, 50]}
                />
              </div>
              <h2 className="text-xl font-semibold text-center mt-4">
                Order Fulfillment Ratio
              </h2>
            </section>

            <section className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-center">
                <DoughnutChart
                  labels={categories.map((i) => Object.keys(i)[0])}
                  data={categories.map((i) => Object.values(i)[0])}
                  backgroundColor={categories.map(
                    (i) =>
                      `hsl(${Object.values(i)[0] * 4}, ${
                        Object.values(i)[0]
                      }%, 50%)`
                  )}
                  legends={false}
                  offset={[0, 0, 0, 80]}
                />
              </div>
              <h2 className="text-xl font-semibold text-center mt-4">
                Product Categories Ratio
              </h2>
            </section>

            <section className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-center">
                <DoughnutChart
                  labels={["In Stock", "Out Of Stock"]}
                  data={[stock.inStock, stock.outOfStock]}
                  backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
                  legends={false}
                  offset={[0, 80]}
                  cutout={"70%"}
                />
              </div>
              <h2 className="text-xl font-semibold text-center mt-4">
                Stock Availability
              </h2>
            </section>

            <section className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-center">
                <DoughnutChart
                  labels={[
                    "Marketing Cost",
                    "Discount",
                    "Burnt",
                    "Production Cost",
                    "Net Margin",
                  ]}
                  data={[
                    revenue.marketingCost,
                    revenue.discount,
                    revenue.burnt,
                    revenue.productionCost,
                    revenue.netMargin,
                  ]}
                  backgroundColor={[
                    "hsl(110,80%,40%)",
                    "hsl(19,80%,40%)",
                    "hsl(69,80%,40%)",
                    "hsl(300,80%,40%)",
                    "rgb(53, 162, 255)",
                  ]}
                  legends={false}
                  offset={[20, 30, 20, 30, 80]}
                />
              </div>
              <h2 className="text-xl font-semibold text-center mt-4">
                Revenue Distribution
              </h2>
            </section>

            <section className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-center">
                <PieChart
                  labels={[
                    "Teenager(Below 20)",
                    "Adult (20-40)",
                    "Older (above 40)",
                  ]}
                  data={[ageGroup.teen, ageGroup.adult, ageGroup.old]}
                  backgroundColor={[
                    `hsl(10, ${80}%, 80%)`,
                    `hsl(10, ${80}%, 50%)`,
                    `hsl(10, ${40}%, 50%)`,
                  ]}
                  offset={[0, 0, 50]}
                />
              </div>
              <h2 className="text-xl font-semibold text-center mt-4">
                Users Age Group
              </h2>
            </section>

            <section className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-center">
                <DoughnutChart
                  labels={["Admin", "Customers"]}
                  data={[adminAndCustomers.admins, adminAndCustomers.customers]}
                  backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
                  offset={[0, 50]}
                />
              </div>
              <h2 className="text-xl font-semibold text-center mt-4">
                Admin vs Customers
              </h2>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default PieCharts;
