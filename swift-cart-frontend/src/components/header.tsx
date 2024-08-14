import { useState } from "react";
import {
  FaSearch,
  FaShoppingCart,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { User } from "../types/types";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { FaBoxArchive } from "react-icons/fa6";
import logo from "../assets/images/logo.png";

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Sign Out Failed");
    }
  };

  return (
    <nav className="bg-[#003F62] flex justify-between items-center gap-3 h-[80px] px-4 sm:px-6 md:px-10 lg:px-20 relative">
      <div className="flex items-center">
        <Link
          to={"/"}
          className="text-3xl text-white cursor-pointer flex items-center mr-3"
          onClick={() => setIsOpen(false)}
        >
          <img src={logo} alt="Logo" className="w-12 h-auto" />
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <Link
          onClick={() => setIsOpen(false)}
          to={"/search"}
          className="flex items-center text-white text-xl gap-2 hover:bg-[#1c3747] px-3 py-2 rounded-lg"
        >
          <FaSearch />
        </Link>
        <Link
          onClick={() => setIsOpen(false)}
          to={"/cart"}
          className="flex items-center text-white text-xl gap-2 hover:bg-[#1c3747] px-3 py-2 rounded-lg"
        >
          <FaShoppingCart />
        </Link>
        {user?._id ? (
          <>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative flex items-center text-white text-xl gap-2 hover:bg-[#1c3747] px-3 py-2 rounded-lg"
            >
              <img
                src={user.photo}
                alt={user.name}
                className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
              {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded shadow-lg text-[#1B5A7D] p-3 z-50">
                  <div className="flex flex-col gap-1">
                    <Link
                      onClick={() => setIsOpen(false)}
                      to="/"
                      className="flex items-center gap-2 text-[#1B5A7D] hover:bg-[#E2F4FF] px-3 py-2 rounded-lg"
                    >
                      {user.name}
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        onClick={() => setIsOpen(false)}
                        to="/admin/dashboard"
                        className="flex items-center gap-2  text-[#1B5A7D] hover:bg-[#E2F4FF] px-3 py-2 rounded-lg"
                      >
                        <FaUser /> Dashboard
                      </Link>
                    )}
                    <Link
                      onClick={() => setIsOpen(false)}
                      to="/orders"
                      className="flex items-center gap-2 text-[#1B5A7D] hover:bg-[#E2F4FF] px-3 py-2 rounded-lg"
                    >
                      <FaBoxArchive /> Orders
                    </Link>
                    <Link
                      to="/"
                      onClick={logoutHandler}
                      className="flex items-center text-[#1B5A7D] gap-2 hover:bg-[#E2F4FF] px-3 py-2 rounded-lg"
                    >
                      <FaSignOutAlt /> Sign Out
                    </Link>
                  </div>
                </div>
              )}
            </button>
          </>
        ) : (
          <Link
            to={"/login"}
            className="flex items-center text-white text-xl gap-2 hover:bg-[#1c3747] px-3 py-2 rounded-lg"
          >
            <FaSignInAlt />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
