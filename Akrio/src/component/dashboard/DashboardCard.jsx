import { ArrowUpRight } from "lucide-react";

const DashboardCard = ({
  title,
  value,
  icon: Icon,
  description,
  iconClassName = "bg-indigo-50 text-indigo-600",
}) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 truncate text-2xl font-bold text-gray-900">
            {value}
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            {description}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${iconClassName}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1 text-xs text-gray-400">
        <ArrowUpRight className="h-3.5 w-3.5" />
        <span>Store overview</span>
      </div>
    </div>
  );
};

export default DashboardCard;