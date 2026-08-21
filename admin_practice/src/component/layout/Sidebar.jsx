import { NavLink } from "react-router-dom";
import Logo from "../../../public/images/image1.png";
const navbar = [
  {
    label: "Dashboard",
    path: "/",
  },
  {
    label: "Products",
    path: "/products",
  },
  {
    label: "Orders",
    path: "/orders",
  },
];

const Sidebar = () => {
  return (
    <aside className="h-full w-64 border rounded bg-[#293354]">
      <div className="h-20 flex items-center gap-3 border-b border-gray-600 bg-[#293354] px-4 py-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#354164]">
          <img
            src={Logo}
            alt="Akash REgmi Company Logo"
            className="h-7 w-7 object-contain"
          />
        </div>
        <div className="flex flex-col">
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
            {nav?.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
