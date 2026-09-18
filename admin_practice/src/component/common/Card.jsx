import {
  Package,
  Star,
  AlertTriangle,
  ShoppingCart,
  Banknote,
} from "lucide-react";

const icons = {
  products: Package,
  featured: Star,
  stock: AlertTriangle,
  orders: ShoppingCart,
  revenue: Banknote,
};

const Card = ({ title, value, type, description }) => {
  const Icon = icons[type];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            {value}
          </h2>

          {description && (
            <p className="mt-1 text-xs text-gray-500">
              {description}
            </p>
          )}
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50">
          <Icon className="h-5 w-5 text-indigo-600" />
        </div>
      </div>
    </div>
  );
};

export default Card;