import { FaArrowRight, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import logo from "../assets/images/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#1B5A7D]">
      <div className="px-20  pt-16 text-[#E2F4FF]">
        <div className="flex items-center text-[#1B5A7D] bg-[#E2F4FF] justify-around h-[140px] rounded-lg mb-10">
          <h1 className="text-3xl font-bold">Subscribe newsletter</h1>
          <form className="relative w-[380px] flex items-center">
            <input
              type="email"
              name="email-address"
              placeholder="Email address"
              className="w-full h-[60px] px-5 text-xl placeholder-white text-white rounded bg-[#EDA415]"
              id=""
            />
            <button
              className="absolute right-3 text-3xl text-white"
              type="submit"
            >
              <FaArrowRight />
            </button>
          </form>
          <div className="flex items-center text-xl">
            <FaPhoneAlt className="text-[#EDA415] mr-2" />
            <p>Call us at: 0123456789</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-6">
          <div>
            <img src={logo} alt="" style={{ width: "3rem" }} />
            <h3 className="text-3xl font-semibold mb-2">Swift Cart</h3>

            <p className="flex items-center gap-2 text-lg">
              <FaLocationDot className="text-gray-400" /> Dhaka, Bangladesh
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Find product</h3>
            <ul>
              <li>
                <a href="#" className="text-gray-400">
                  Laptop
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400">
                  Smart phones
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400">
                  Smart Watch
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400">
                  Camera
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Support</h3>
            <ul>
              <li>
                <a href="#" className="text-gray-400">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400">
                  Shipping Information
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <ul>
              <li>
                <a href="#" className="text-gray-400">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pb-5 text-center">
          <p>&copy; 2024 E-commerce Site. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
