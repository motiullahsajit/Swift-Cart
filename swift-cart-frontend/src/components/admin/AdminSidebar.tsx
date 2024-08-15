import { useEffect, useState } from "react";
import { AiFillFileText } from "react-icons/ai";
import {
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaSignOutAlt,
} from "react-icons/fa";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoIosPeople } from "react-icons/io";
import {
  RiCoupon3Fill,
  RiDashboardFill,
  RiShoppingBag3Fill,
} from "react-icons/ri";
import { Link, Location, useLocation } from "react-router-dom";
import { IconType } from "react-icons";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { userNotExits } from "../../redux/reducer/userReducer";
import toast from "react-hot-toast";
import { auth } from "../../firebase";
import { CgWebsite } from "react-icons/cg";

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [phoneActive, setPhoneActive] = useState<boolean>(
    window.innerWidth < 1100
  );

  const resizeHandler = () => {
    setPhoneActive(window.innerWidth < 1100);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      dispatch(userNotExits());
      toast.success("Sign Out Successfully");
    } catch (error) {
      toast.error("Sign Out Failed");
    }
  };

  return (
    <>
      {phoneActive && (
        <button id="hamburger" onClick={() => setShowModal(true)}>
          <HiMenuAlt4 />
        </button>
      )}

      <aside
        style={
          phoneActive
            ? {
                width: "20rem",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: showModal ? "0" : "-20rem",
                transition: "all 0.5s",
              }
            : {}
        }
      >
        <DivOne location={location} logoutHandler={logoutHandler} />

        {phoneActive && (
          <button id="close-sidebar" onClick={() => setShowModal(false)}>
            Close
          </button>
        )}
      </aside>
    </>
  );
};

const DivOne = ({
  location,
  logoutHandler,
}: {
  location: Location;
  logoutHandler: () => void;
}) => (
  <div>
    <h3 className="text-2xl font-extrabold text-[#1B5A7D] text-center mb-6">
      <span className="block">Swift Cart</span>
      <span className="text-lg font-medium text-gray-600">Admin Panel</span>
    </h3>

    <ul>
      <Li url="/" text="Visit Site" Icon={CgWebsite} location={location} />
      <Li
        url="/admin/dashboard"
        text="Dashboard"
        Icon={RiDashboardFill}
        location={location}
      />
      <Li
        url="/admin/product"
        text="Products"
        Icon={RiShoppingBag3Fill}
        location={location}
      />
      <Li
        url="/admin/customer"
        text="Customers"
        Icon={IoIosPeople}
        location={location}
      />
      <Li
        url="/admin/transaction"
        text="Orders"
        Icon={AiFillFileText}
        location={location}
      />
      <Li
        url="/admin/chart/bar"
        text="Order & Customer"
        Icon={FaChartBar}
        location={location}
      />
      <Li
        url="/admin/chart/pie"
        text="Ratio"
        Icon={FaChartPie}
        location={location}
      />
      <Li
        url="/admin/chart/line"
        text="Growth"
        Icon={FaChartLine}
        location={location}
      />
      <Li
        url="/admin/app/coupon"
        text="Manage Coupons"
        Icon={RiCoupon3Fill}
        location={location}
      />
      <Li
        url="/"
        text="Sign Out"
        Icon={FaSignOutAlt}
        location={location}
        logoutHandler={logoutHandler}
      />
    </ul>
  </div>
);

interface LiProps {
  url: string;
  text: string;
  location: Location;
  Icon: IconType;
  logoutHandler?: () => void;
}
const Li = ({ url, text, location, Icon, logoutHandler }: LiProps) => (
  <li
    style={{
      backgroundColor:
        location.pathname === url ? "rgba(0,115,255,0.1)" : "white",
    }}
  >
    <Link
      to={url}
      style={{
        color: "#1B5A7D",
      }}
      onClick={logoutHandler}
    >
      <Icon />
      {text}
    </Link>
  </li>
);

export default AdminSidebar;
