import ProductSection from "../../ProductSection";

const ProductsCategory = () => {
  const ProductsItems = [
    {
      id: 1,
      productName: "Vegetables",
      productImage: "/Images/ProductIcons/vegetables.png",
    },
    {
      id: 2,
      productName: "Fruits",
      productImage: "/Images/ProductIcons/healthy-food.png",
    },
    {
      id: 3,
      productName: "Milk & Juice",
      productImage: "/Images/ProductIcons/drink.png",
    },
    {
      id: 4,
      productName: "Bakery",
      productImage: "/Images/ProductIcons/Bakery.png",
    },
    {
      id: 5,
      productName: "Personal Care",
      productImage: "/Images/ProductIcons/cream.png",
    },
    {
      id: 6,
      productName: "Grains",
      productImage: "/Images/ProductIcons/bread.png",
    },
    {
      id: 7,
      productName: "Chicken & Egg",
      productImage: "/Images/ProductIcons/fried-chicken.png",
    },
  ];
  return (
    <div className="w-full h-full px-10">
      <h2 className="text-3xl font-bold text-[#8ef13d]">Shop by Category</h2>
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
