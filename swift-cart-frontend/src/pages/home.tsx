import { Link } from "react-router-dom";
import PolicyInfo from "../components/Home/PolicyInfo";
import ProductReel from "../components/productReel";
import Brands from "../components/Home/Brands";

const Home = () => {
  return (
    <main className="home">
      <section className="banner1 flex items-center justify-end h-[417px] w-full">
        <div className="text-center mx-10">
          <h1 className="text-3xl my-5 text-white">Sale up to 50% off</h1>
          <Link
            to="/search"
            className="py-4 px-7 inline-block bg-[#EDA415] text-white rounded-lg"
          >
            Shop Now
          </Link>
        </div>
      </section>
      <ProductReel type="Latest Products" category="latest" />
      <ProductReel type="Latest Phones" category="phone" />
      <PolicyInfo />
      <section className="banner2 flex items-center justify-end px-20 h-[417px] w-[1320px] mt-16">
        <div className="text-center mx-10">
          <h1 className="text-3xl my-5 text-white">Sale up to 50% off</h1>
          <Link
            to="/search"
            className="py-4 px-7 inline-block bg-[#EDA415] text-white rounded-lg"
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
