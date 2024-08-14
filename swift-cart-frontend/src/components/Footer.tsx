import { FaArrowRight, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import logo from "../assets/images/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#1B5A7D] text-[#E2F4FF]">
      <div className="px-5 md:px-10 lg:px-20 pt-10 lg:pt-16">
        <div className="flex flex-col lg:flex-row items-center text-[#1B5A7D] bg-[#E2F4FF] justify-around py-6 lg:h-[140px] rounded-lg mb-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 lg:mb-0">
            Subscribe newsletter
          </h1>
          <form className="relative w-full max-w-sm flex items-center mb-4 lg:mb-0">
            <input
              type="email"
              name="email-address"
              placeholder="Email address"
              className="w-full h-[50px] lg:h-[60px] px-5 text-lg lg:text-xl placeholder-white text-white rounded bg-[#EDA415] focus:outline-none"
              id=""
            />
            <button
              className="absolute right-3 text-2xl lg:text-3xl text-white"
              type="submit"
            >
              <FaArrowRight />
            </button>
          </form>
          <div className="flex items-center text-lg md:text-xl">
            <FaPhoneAlt className="text-[#EDA415] mr-2" />
            <p>Call us at: 0123456789</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <img src={logo} alt="Swift Cart Logo" className="w-12 mb-2" />
            <h3 className="text-2xl font-semibold mb-2">Swift Cart</h3>
            <p className="flex items-center gap-2 text-base md:text-lg justify-center lg:justify-start">
              <FaLocationDot className="text-gray-400" /> Dhaka, Bangladesh
            </p>
          </div>
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h3 className="text-lg font-semibold mb-2">Find product</h3>
            <ul className="flex flex-col items-center lg:items-start space-y-1">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Laptop
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Smart phones
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Smart Watch
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Camera
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h3 className="text-lg font-semibold mb-2">Support</h3>
            <ul className="flex flex-col items-center lg:items-start space-y-1">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Shipping Information
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <ul className="flex flex-col items-center lg:items-start space-y-1">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pb-5 text-center text-sm md:text-base">
          <p>&copy; 2024 E-commerce Site. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
