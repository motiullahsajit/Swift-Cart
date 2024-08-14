import { FaCrown, FaShippingFast } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";

const PolicyInfo = () => {
  return (
    <section className="mt-10 px-4">
      <div className="flex flex-col md:flex-row justify-around items-center h-auto md:h-[155px] mx-auto bg-[#E2F4FF] rounded-lg py-6 md:py-0">
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-4 md:mb-0">
          <FaShippingFast className="text-4xl md:text-5xl text-[#EDA415]" />
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl text-[#003F62]">
              Free Delivery
            </h1>
            <p className="text-base md:text-lg text-[#003F62]">
              on orders above Tk 10000
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-4 md:mb-0">
          <FaCrown className="text-4xl md:text-5xl text-[#EDA415]" />
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl text-[#003F62]">
              Best Quality
            </h1>
            <p className="text-base md:text-lg text-[#003F62]">at low price</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <IoShieldCheckmark className="text-4xl md:text-5xl text-[#EDA415]" />
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl text-[#003F62]">
              1 Year Warranty
            </h1>
            <p className="text-base md:text-lg text-[#003F62]">
              Available warranty
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PolicyInfo;
