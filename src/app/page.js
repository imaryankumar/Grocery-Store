import HeroBanner from "@/components/HeroBanner";
import PopularProducts from "@/components/PopularProducts";
import ProductsCategory from "@/components/ProductsCategory";

const Home = () => {
  return (
    <div className="w-full h-full display-flex flex-col px-4 sm:px-6 md:px-10">
      <HeroBanner />
      <ProductsCategory />
      <PopularProducts />
    </div>
  );
};

export default Home;
