import { useEffect, useState } from "react";
import getData from "../api/report/getData";
import ReportTable from "../components/Orders/ReportTable";

function Dashboard() {
  const [orderCount, setOrderCount] = useState("");
  const [totalRevenue, setTotalRevenue] = useState("");
  const [dishes, setDishes] = useState([]);
  const getReportData = async () => {
    const res = await getData();
    console.log(res);
    setOrderCount(res.data.ordersCount);
    setTotalRevenue(res.data.totalRevenue);
    setDishes(res.data.dishesSold);
  };

  useEffect(() => {
    getReportData();
  }, []);
  return (
    <div>
      <div className="p-4">
        <h1 className="sub-header font-bold">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Total Orders</h2>
            <p className="text-2xl font-bold">{orderCount}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Total Revenue</h2>
            <p className="text-2xl font-bold">{totalRevenue}</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="sub-header font-bold mb-6">Recent Orders</h2>
          <div className="bg-white rounded-lg shadow-md pb-10">
            <ReportTable orders={dishes} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
