import {
  Package,
  Star,
  AlertTriangle,
  ShoppingCart,
  IndianRupee,
} from "lucide-react";

import { useDashboard } from "../hooks/useDashboard";

import Loading from "../component/common/ThreeDotLoading";
import DashboardCard from "../component/dashboard/DashboardCard";
import OrdersStatus from "../component/dashboard/OrdersStatus";
import TopCategories from "../component/dashboard/TopCategories";
import RecentOrders from "../component/dashboard/RecentOrders";

const Dashboard = () => {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useDashboard();

  /* ---------------- Loading ---------------- */

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loading text="Loading dashboard..." size="md" />
      </div>
    );
  }

  /* ---------------- Error ---------------- */

  if (isError) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Unable to load dashboard
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {error?.message ||
              "Something went wrong while loading your dashboard."}
          </p>

          <button
            onClick={() => refetch()}
            className="mt-4 rounded-lg bg-[#293354] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#202943]"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const {
    summary = {},
    topCategories = [],
    ordersByStatus = [],
    revenueByDay = [],
    recentOrders = [],
  } = data || {};

  /* ---------------- Dashboard Cards ---------------- */

  const cards = [
    {
      title: "Total Products",
      value: summary.totalProducts ?? 0,
      icon: Package,
      description: "Products in your store",
      iconClassName: "bg-indigo-50 text-indigo-600",
    },

    {
      title: "Featured Products",
      value: summary.featuredProducts ?? 0,
      icon: Star,
      description: "Currently featured",
      iconClassName: "bg-yellow-50 text-yellow-600",
    },

    {
      title: "Low Stock",
      value: summary.lowStockProducts ?? 0,
      icon: AlertTriangle,
      description: "Products need attention",
      iconClassName: "bg-red-50 text-red-600",
    },

    {
      title: "Total Orders",
      value: summary.totalOrders ?? 0,
      icon: ShoppingCart,
      description: "Orders received",
      iconClassName: "bg-blue-50 text-blue-600",
    },
  ];

  return (
    <div className="space-y-6 m-3    lg:m-6">
      
      {/* ========================================
          SUMMARY CARDS
      ======================================== */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 ">
        {cards.map((card) => (
          <DashboardCard key={card.title} {...card} />
        ))}
      </div>

      {/* ========================================
          REVENUE
      ======================================== */}

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Paid Revenue</p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              Rs. {summary.paidRevenue?.toLocaleString() ?? 0}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Revenue from paid orders
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50">
            <IndianRupee className="h-6 w-6 text-green-600" />
          </div>
        </div>
      </div>

      {/* ========================================
          CATEGORIES + ORDER STATUS
      ======================================== */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TopCategories categories={topCategories} />

        <OrdersStatus ordersByStatus={ordersByStatus} />
      </div>

      {/* ========================================
          REVENUE BY DAY
      ======================================== */}

      <RevenueByDay revenueByDay={revenueByDay} />

      {/* ========================================
          RECENT ORDERS
      ======================================== */}

      <RecentOrders orders={recentOrders} />
    </div>
  );
};

const RevenueByDay = ({ revenueByDay = [] }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Revenue Overview
        </h2>

        <p className="mt-1 text-sm text-gray-500">Daily paid revenue</p>
      </div>

      {revenueByDay.length === 0 ? (
        <div className="flex min-h-40 items-center justify-center">
          <p className="text-sm text-gray-400">No revenue data available</p>
        </div>
      ) : (
        <div className="space-y-3">
          {revenueByDay.map((item) => (
            <div
              key={item.date}
              className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3"
            >
              <span className="text-sm text-gray-600">
                {new Date(item.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>

              <span className="font-semibold text-gray-900">
                Rs. {item.revenue?.toLocaleString() ?? 0}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
