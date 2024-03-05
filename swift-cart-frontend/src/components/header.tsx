import { useState } from "react";
import {
  FaSearch,
  FaShoppingCart,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../types/types";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Breadcrumbs from "./Breadcrumbs";

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const searchHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/search?name=${searchTerm}`);
  };

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
    <>
      <nav className="bg-[#003F62] flex justify-between px-20 items-center gap-3 h-[80px]">
        <div className="flex items-center justify-center ">
          <Link
            to={"/"}
            className="text-3xl text-white cursor-pointer py-3 px-5 mr-3"
            onClick={() => setIsOpen(false)}
          >
            Swift Cart
          </Link>
          <form onSubmit={searchHandler}>
            <input
              type="text"
              placeholder="Search"
              className="px-4 h-[46px] w-[500px] rounded-s-xl"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input
              type="submit"
              value="Search"
              className="h-[46px] w-[132px] px-3 cursor-pointer rounded-e-xl bg-[#EDA415]"
            />
          </form>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Link
            className="text-white"
            onClick={() => setIsOpen(false)}
            to={"/"}
          >
            HOME
          </Link>
          <Link onClick={() => setIsOpen(false)} to={"/search"}>
            <FaSearch />
          </Link>
          <Link
            className="flex items-center text-white text-xl gap-2 hover:bg-[#1c3747] px-3 py-2 rounded-lg"
            onClick={() => setIsOpen(false)}
            to={"/cart"}
          >
            <FaShoppingCart />
            Cart
          </Link>

          {user?._id ? (
            <>
              <button
                className="flex items-center gap-2 text-white text-xl"
                onClick={() => setIsOpen(!isOpen)}
              >
                <FaUser /> {user.name}
              </button>
              <dialog open={isOpen}>
                <div>
                  {user.role === "admin" && (
                    <Link
                      onClick={() => setIsOpen(false)}
                      to="/admin/dashboard"
                    >
                      Admin
                    </Link>
                  )}
                  <Link onClick={() => setIsOpen(false)} to="/orders">
                    Orders
                  </Link>
                  <button>
                    <FaSignOutAlt onClick={logoutHandler} />
                  </button>
                </div>
              </dialog>
            </>
          ) : (
            <Link
              className="flex items-center text-white text-xl gap-2 hover:bg-[#1c3747] px-3 py-2 rounded-lg"
              to={"/login"}
            >
              <FaSignInAlt /> Sign In
            </Link>
          )}
        </div>
      </nav>
      <Breadcrumbs />
    </>
  );
};

export default Header;
