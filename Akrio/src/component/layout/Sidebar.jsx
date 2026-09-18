import { NavLink } from "react-router-dom";
import Logo from "../../../public/images/image1.png";
import { Apple, LayoutDashboard, ShoppingCart } from "lucide-react";

const navbar = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: <LayoutDashboard />,
  },
  {
    label: "Products",
    path: "/admin/products",
    icon: <Apple />,
  },
  {
    label: "Orders",
    path: "/orders",
    icon: <ShoppingCart />,
  },
];

const Sidebar = () => {
  return (
    <aside className="h-full w-16 shrink-0 border rounded bg-[#293354] sm:w-60">
      <div className="h-20 flex items-center justify-center gap-3 border-b border-gray-600 bg-[#293354] px-4 py-3 sm:justify-start sm:gap-3 sm:px-4 ">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#354164] ">
          <img
            src={Logo}
            alt="Akash REgmi Company Logo"
            className="h-7 w-7 object-contain"
          />
        </div>
        <div className=" hidden  flex-col sm:flex">
          <h1 className="text-lg font-bold leading-none text-white">
            Akash Regmi
          </h1>

          <p className="mt-1 text-[9px] font-bold tracking-widest text-gray-300">
            STUDENT HUB
          </p>
        </div>
      </div>
      <nav className="flex flex-col gap-2">
        {" "}
        {navbar.map((nav) => (
          <NavLink
            key={nav?.path}
            to={nav.path}
            className={({ isActive }) =>
              `rounded px-3 py-4 text-white transition ${
                isActive ? "bg-gray-600" : "hover:bg-gray-600"
              }`
            }
          >
            <div className="flex w-full items-center justify-center sm:justify-start sm:gap-3">
              {" "}
              {nav?.icon}
              <span className="hidden sm:block">{nav?.label}</span>
            </div>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
