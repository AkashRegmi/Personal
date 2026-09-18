import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-[#293354] text-white  ">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-bold">
              Akrio
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-300">
              Discover quality products at great prices. Shop easily, securely,
              and conveniently with MyStore.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="rounded-full bg-white/10 p-2.5 transition hover:bg-white/20"
              ></a>

              <a
                href="#"
                aria-label="Instagram"
                className="rounded-full bg-white/10 p-2.5 transition hover:bg-white/20"
              ></a>

              <a
                href="#"
                aria-label="Twitter"
                className="rounded-full bg-white/10 p-2.5 transition hover:bg-white/20"
              ></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 transition hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  className="text-gray-300 transition hover:text-white"
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  to="/categories"
                  className="text-gray-300 transition hover:text-white"
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  className="text-gray-300 transition hover:text-white"
                >
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Customer
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  to="/login"
                  className="text-gray-300 transition hover:text-white"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="text-gray-300 transition hover:text-white"
                >
                  Register
                </Link>
              </li>

              <li>
                <Link
                  to="/orders"
                  className="text-gray-300 transition hover:text-white"
                >
                  My Orders
                </Link>
              </li>

              <li>
                <Link
                  to="/profile"
                  className="text-gray-300 transition hover:text-white"
                >
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Contact Us
            </h3>

            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0" />

                <span className="text-gray-300">Kathmandu, Nepal</span>
              </li>

              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0" />

                <a
                  href="mailto:support@mystore.com"
                  className="text-gray-300 transition hover:text-white"
                >
                  support@akrio.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0" />

                <a
                  href="tel:+9779800000000"
                  className="text-gray-300 transition hover:text-white"
                >
                  +977 9867544555
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-400 sm:flex-row">
            <p>© {new Date().getFullYear()} Akrio. All rights reserved.</p>

            <div className="flex gap-5">
              <Link to="/privacy" className="transition hover:text-white">
                Privacy Policy
              </Link>

              <a
                href="/Akrio_Terms_and_Conditions.pdf   "
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
