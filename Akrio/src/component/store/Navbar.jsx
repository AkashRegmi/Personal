import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut, Package, UserCircle } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { data } = useCart();
  const { isAuthenticated } = useAuth();
  const cartItems = data?.cart?.items || [];

  const cartCount = cartItems?.length;
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");

    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#293354]">
          Akrio
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium transition ${
                isActive
                  ? "text-[#293354]"
                  : "text-gray-600 hover:text-[#293354]"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `text-sm font-medium transition ${
                isActive
                  ? "text-[#293354]"
                  : "text-gray-600 hover:text-[#293354]"
              }`
            }
          >
            Products
          </NavLink>
          {isAuthenticated && (
            <NavLink
              to="/customer/orders"
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-[#293354]"
                    : "text-gray-600 hover:text-[#293354]"
                }`
              }
            >
              Orders
            </NavLink>
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <button
            onClick={() => navigate("/cart")}
            className="relative rounded-full p-2 text-gray-600 transition hover:bg-gray-100 hover:text-[#293354]"
            aria-label="Shopping cart"
          >
            <ShoppingCart size={21} />

            {/* Cart count - we'll connect this later */}
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* User */}
          {user ? (
            <div className="group relative">
              <button className="flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-gray-100">
                <UserCircle size={22} className="text-[#293354]" />

                <span className="hidden text-sm font-medium text-gray-700 sm:block">
                  {user.username || user.name || "Account"}
                </span>
              </button>

              {/* Dropdown */}
              <div className="invisible absolute right-0 top-full mt-2 w-48 translate-y-2 rounded-xl border bg-white p-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <button
                  onClick={() => navigate("/profile")}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <User size={17} />
                  Profile
                </button>

                <button
                  onClick={() => navigate("/customer/orders")}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Package size={17} />
                  My Orders
                </button>

                <div className="my-1 border-t" />

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="hidden text-sm font-medium text-gray-600 hover:text-[#293354] sm:block"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="rounded-lg bg-[#293354] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#202943]"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
