import { Outlet } from "react-router-dom";
import Navbar from "../store/Navbar";
import Footer from "../store/Footer";
export const StoreLayout = () => {
  return (
    <div className=" min-h-full">
      <Navbar />
      <main className=" flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
