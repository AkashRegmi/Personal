import { Search, Bell } from "lucide-react";
const Header = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser
    ? JSON.parse(storedUser)
    : {
        id: null,
        firstName: "Guest",
        lastName: "",
        image: null,
        username: "guest",
      };

  const fullName =
    `${user.firstName || ""} ${user.lastName || ""} `.trim() ||
    user.username ||
    "Guest";
  return (
    <div className=" flex items-center justify-between h-20  bordr-b border-gray-200 bg-white rounded-2xl p-3">
      <div>
        <p className="text-sm text-gray-500">Welcome back,</p>
        <h1 className="text-xl font-bold text-gray-800">{fullName} 👋</h1>
      </div>
      <div className="flex items-center gap-5">
        {/* Put position: relative on a container box so that any inner element with position: absolute stays locked inside that specific parent instead of moving relative to the whole page */}

        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-64 rounded-lg border px-4 py-2 pl-10"
          />
        </div>
        <button type="button">
          <Bell size={21} />
        </button>
        <div className=" flex items-center gap-2">
          {user.image ? (
            <img
              src={user.image}
              alt={fullName}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#293354] text-white">
              {fullName.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="font-semibold">{fullName}</p>
            <p className="text-sm text-gray-500">{user.username || "guest"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
