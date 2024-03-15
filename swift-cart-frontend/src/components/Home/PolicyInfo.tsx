import { FaCrown, FaShippingFast } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";

const PolicyInfo = () => {
  return (
    <div>
      <div className="flex justify-around items-center w-[1328px] h-[155px] mx-auto bg-[#E2F4FF] rounded-2xl">
        <div className="flex gap-4 justify-center items-center">
          <FaShippingFast className="text-5xl text-[#EDA415]" />
          <div>
            <h1 className="text-3xl text-[#003F62]">Free Delivery</h1>
            <p className="text-lg text-[#003F62]">on order above Tk 10000</p>
          </div>
        </div>
        <div className="flex gap-4 justify-center items-center">
          <FaCrown className="text-5xl text-[#EDA415]" />
          <div>
            <h1 className="text-3xl text-[#003F62]">Best Quality</h1>
            <p className="text-lg text-[#003F62]">at low price</p>
          </div>
        </div>
        <div className="flex gap-4 justify-center items-center">
          <IoShieldCheckmark className="text-5xl text-[#EDA415]" />
          <div>
            <h1 className="text-3xl text-[#003F62]">1 Year Warranty</h1>
            <p className="text-lg text-[#003F62]">Available warrenty </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyInfo;
