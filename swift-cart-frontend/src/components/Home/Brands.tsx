import { FaApple } from "react-icons/fa";
import {
  SiAsus,
  SiDell,
  SiLenovo,
  SiNikon,
  SiSamsung,
  SiSony,
} from "react-icons/si";

const Brands = () => {
  return (
    <section className="mt-12">
      <div className="flex flex-wrap justify-evenly gap-6 md:gap-8 lg:gap-12 items-center bg-[#E2F4FF] rounded-lg py-8 shadow-lg">
        <div className="brand-item">
          <SiSamsung className="text-[50px] md:text-[70px] lg:text-[80px] transition-transform duration-300 transform hover:scale-110" />
        </div>
        <div className="brand-item">
          <SiSony className="text-[50px] md:text-[70px] lg:text-[80px] transition-transform duration-300 transform hover:scale-110" />
        </div>
        <div className="brand-item">
          <FaApple className="text-[50px] md:text-[70px] lg:text-[80px] transition-transform duration-300 transform hover:scale-110" />
        </div>
        <div className="brand-item">
          <SiLenovo className="text-[50px] md:text-[70px] lg:text-[80px] transition-transform duration-300 transform hover:scale-110" />
        </div>
        <div className="brand-item">
          <SiAsus className="text-[50px] md:text-[70px] lg:text-[80px] transition-transform duration-300 transform hover:scale-110" />
        </div>
        <div className="brand-item">
          <SiNikon className="text-[50px] md:text-[70px] lg:text-[80px] transition-transform duration-300 transform hover:scale-110" />
        </div>
        <div className="brand-item">
          <SiDell className="text-[50px] md:text-[70px] lg:text-[80px] transition-transform duration-300 transform hover:scale-110" />
        </div>
      </div>
    </section>
  );
};

export default Brands;
