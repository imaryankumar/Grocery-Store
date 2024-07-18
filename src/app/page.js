import Headers from "@/components/Headers";
import HeroBanner from "@/components/HeroBanner";
import PopularProducts from "@/components/PopularProducts";
import ProductsCategory from "@/components/ProductsCategory";

const Home = () => {
  return (
    <section className="w-full h-full display-flex flex-col ">
      <Headers />
      <div className="w-full h-full px-4 sm:px-6 md:px-10">
        <HeroBanner />
        <ProductsCategory />
        <PopularProducts />
      </div>
    </section>
  );
};

export default Home;
