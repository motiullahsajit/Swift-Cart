import { FaArrowRight, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#E2F4FF] text-[#1B5A7D] p-6 mt-16">
      <div className="flex items-center bg-white justify-around w-[1320px] h-[140px] rounded-2xl mx-auto mb-5">
        <h1 className="text-3xl font-bold">Subscribe newsletter</h1>
        <form className="relative w-[380px] flex items-center">
          <input
            type="email"
            name="email-address"
            placeholder="Email address"
            className="w-full h-[60px] px-5 text-xl placeholder-white text-white rounded-2xl bg-[#EDA415]"
            id=""
          />
          <button
            className="absolute right-3 text-3xl text-white"
            type="submit"
          >
            <FaArrowRight />
          </button>
        </form>
        <div className="flex items-center gap-3 text-xl">
          <FaPhoneAlt className="text-[#EDA415]" />
          <p>Call us at: 0123456789</p>
        </div>
      </div>
      <div className="w-[1320px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-6">
          <div>
            <h3 className="text-3xl font-semibold mb-2">Swift Cart</h3>
            <p className="flex items-center gap-2 text-lg">
              <FaLocationDot className="text-gray-400" /> Dhaka, Bangladesh
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Find product</h3>
            <ul>
              <li>
                <p>Laptop</p>
              </li>
              <li>
                <a href="#">Smart phones</a>
              </li>
              <li>
                <a href="#">Smart Watch</a>
              </li>
              <li>
                <a href="#">Camera</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Support</h3>
            <ul>
              <li>
                <a href="#">FAQs</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Shipping Information</a>
              </li>
              <li>
                <a href="#">Return Policy</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <ul>
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">Twitter</a>
              </li>
              <li>
                <a href="#">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 E-commerce Site. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
