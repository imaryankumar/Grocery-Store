import ProductSection from "../utils/ProductSection";
import ProductsItems from "../../public/json/ProductsItems.json";
const ProductsCategory = () => {
  return (
    <div className="w-full h-full">
      <h2 className="text-3xl font-bold text-[#67b12b]">Shop by Category</h2>
      <div className="w-full h-full flex items-start justify-between pt-3 ">
        {ProductsItems.map((items) => {
          return (
            <ProductSection
              key={items.id}
              productName={items.productName}
              productImage={items.productImage}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductsCategory;
