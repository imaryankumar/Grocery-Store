import Image from "next/image";

const ProductSection = ({ productName, productImage }) => {
  return (
    <div className="productcategory-size flex flex-col items-center justify-center gap-3 rounded-md shadow cursor-pointer">
      <Image src={productImage} alt={productName} width={100} height={100} />
      <h3 className="text-xl font-medium text-center">{productName}</h3>
    </div>
  );
};

export default ProductSection;
