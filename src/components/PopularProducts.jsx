import PopularItemList from "../../public/json/PopularItemList.json";
import PopularListProduct from "@/utils/PopularListProduct";
const PopularProducts = () => {
  return (
    <div className="w-full h-full py-10">
      <h3 className="text-2xl md:text-3xl font-bold text-[#67b12b]">
        Our Popular Products
      </h3>
      <div className="pt-3 w-full h-full grid grid-cols-1 sm:grid-col-2 md:grid-cols-4 gap-10">
        {PopularItemList.map((item) => {
          return (
            <PopularListProduct
              key={item.id}
              id={item.id}
              productImage={item.productImage}
              productName={item.productName}
              productReguPrice={item.productReguPrice}
              productBasePrice={item.productBasePrice}
              productQuantity={item.productQuantity}
              productCategory={item.productCategory}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PopularProducts;
