import HeroBanner from "@/components/HeroBanner";
import ProductsCategory from "@/components/ProductsCategory";

const Home = () => {
  return (
    <div className="w-full h-screen display-flex flex-col">
      <HeroBanner />
      <ProductsCategory />
    </div>
  );
};

export default Home;
