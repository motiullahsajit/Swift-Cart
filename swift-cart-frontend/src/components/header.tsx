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
  // const [isOpenCategories, setIsOpenCategories] = useState<boolean>(false);
  // const [searchTerm, setSearchTerm] = useState("");

  // const searchHandler = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   navigate(`/search?name=${searchTerm}`);
  // };

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
      <nav className="bg-[#003F62] flex justify-between lg:px-20 sm-px-10 items-center gap-3 h-[80px]">
        <div className="flex items-center justify-center ">
          <Link
            to={"/"}
            className="text-3xl text-white cursor-pointer mr-3 flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <img src={logo} alt="" style={{ width: "3rem" }} />
          </Link>
          {/* <form onSubmit={searchHandler}>
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
          </form>  */}
        </div>
        <div className="flex items-center justify-center gap-3">
          <Link
            onClick={() => setIsOpen(false)}
            to={"/search"}
            className="flex items-center text-white text-xl gap-2 hover:bg-[#1c3747] px-3 py-2 rounded-lg"
          >
            <FaSearch />
          </Link>
          <Link
            className="flex items-center text-white text-xl gap-2 hover:bg-[#1c3747] px-3 py-2 rounded-lg"
            onClick={() => setIsOpen(false)}
            to={"/cart"}
          >
            <FaShoppingCart />
          </Link>
          {user?._id ? (
            <>
              <button
                className="flex items-center text-white text-xl gap-2 hover:bg-[#1c3747] px-3 py-2 rounded-lg"
                onClick={() => setIsOpen(!isOpen)}
              >
                <FaUser />
              </button>
              <dialog className="relative text-[#1B5A7D] " open={isOpen}>
                <div className="flex flex-col gap-1 p-3 absolute right-0 mt-4 w-48 bg-white rounded- shadow-lg z-10">
                  <Link
                    className="flex items-center gap-2 text-[#1B5A7D] hover:bg-[#E2F4FF] px-3 py-2 rounded-lg"
                    onClick={() => setIsOpen(false)}
                    to="/"
                  >
                    {user.name}
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      className="flex items-center gap-2 text-[#1B5A7D] hover:bg-[#E2F4FF] px-3 py-2 rounded-lg"
                      onClick={() => setIsOpen(false)}
                      to="/admin/dashboard"
                    >
                      <FaUser /> Dashboard
                    </Link>
                  )}

                  <Link
                    className="flex items-center gap-2 text-[#1B5A7D] hover:bg-[#E2F4FF] px-3 py-2 rounded-lg"
                    onClick={() => setIsOpen(false)}
                    to="/orders"
                  >
                    <FaBoxArchive /> Orders
                  </Link>
                  <button className="flex items-center gap-2 hover:bg-[#E2F4FF] px-3 py-2 rounded-lg">
                    <FaSignOutAlt onClick={logoutHandler} /> Sign Out
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
    </>
  );
};

export default Header;
