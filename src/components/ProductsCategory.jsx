import ProductSection from "../utils/ProductSection";
import ProductsItems from "../../public/json/ProductsItems.json";
const ProductsCategory = () => {
  return (
    <div className="w-full h-full">
      <h2 className="text-2xl md:text-3xl text-center md:text-left font-bold text-[#67b12b]">
        Shop by Category
      </h2>
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-5 xl:gap-10 pt-3 items-center justify-center place-items-center ">
        {ProductsItems.map((items) => {
          return (
            <ProductSection
              key={items.id}
              productName={items.productName}
              productImage={items.productImage}
              productSlug={items.productSlug}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductsCategory;
