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
    <section className="">
      <div className="h-[130px] flex justify-evenly items-center bg-[#E2F4FF] rounded-lg">
        <SiSamsung className="text-[60px]" />
        <SiSony className="text-[60px]" />
        <FaApple className="text-[50px]" />
        <SiLenovo className="text-[60px]" />
        <SiAsus className="text-[60px]" />
        <SiNikon className="text-[60px]" />
        <SiDell className="text-[50px]" />
      </div>
    </section>
  );
};

export default Brands;
