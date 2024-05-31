"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
const ProductSection = ({ productName, productImage, productSlug }) => {
  const router = useRouter();
  const onCategoryProductHandler = (id) => {
    router.push(`/shop/${id}`);
  };
  return (
    <div
      className="productcategory-size flex flex-col items-center justify-center gap-3 rounded-md shadow cursor-pointer"
      onClick={() => onCategoryProductHandler(productSlug)}>
      <Image src={productImage} alt={productName} width={100} height={100} />
      <h3 className="text-xl font-medium text-center">{productName}</h3>
    </div>
  );
};

export default ProductSection;
