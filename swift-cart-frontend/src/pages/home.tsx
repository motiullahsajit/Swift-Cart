import { Link } from "react-router-dom";
import PolicyInfo from "../components/Home/PolicyInfo";
import ProductReel from "../components/productReel";
import Brands from "../components/Home/Brands";

const Home = () => {
  return (
    <main className="home">
      <section className="banner1 flex items-center justify-end h-[417px] w-full bg-cover bg-center relative overflow-hidden">
        <div className="text-center mx-10 sm:mx-20 md:mx-40 lg:mx-60">
          <h1 className="text-2xl md:text-3xl lg:text-4xl my-5 text-white font-bold">
            Sale up to 30% off
          </h1>
          <Link
            to="/search"
            className="py-3 px-5 md:py-4 md:px-7 inline-block bg-[#EDA415] text-white rounded-lg hover:bg-[#db9613] transition-colors duration-300"
          >
            Shop Now
          </Link>
        </div>
      </section>
      <ProductReel type="Latest Products" category="latest" />
      <ProductReel type="Latest Phones" category="phone" />
      <PolicyInfo />
      <section className="banner2 flex items-center justify-end h-[417px] w-full bg-cover bg-center relative overflow-hidden mt-16">
        <div className="text-center mx-10 sm:mx-20 md:mx-40 lg:mx-60">
          <h1 className="text-2xl md:text-3xl lg:text-4xl my-5 text-white font-bold">
            Sale up to 50% off
          </h1>
          <Link
            to="/search"
            className="py-3 px-5 md:py-4 md:px-7 inline-block bg-[#EDA415] text-white rounded-lg hover:bg-[#db9613] transition-colors duration-300"
          >
            Shop Now
          </Link>
        </div>
      </section>
      <ProductReel type="Latest Laptops" category="laptop" />
      <ProductReel type="Latest Watches" category="watch" />
      <Brands />
    </main>
  );
};

export default Home;
