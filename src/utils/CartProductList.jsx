import Image from "next/image";
import { MdDelete } from "react-icons/md";

const CartProductList = ({
  prodName,
  prodImg,
  prodPrice,
  prodQuality,
  products,
}) => {
  return (
    <div className="w-full flex items-center justify-between gap-2 border">
      <span>
        <Image src={prodImg} width={100} height={100} alt={prodName} />
      </span>
      <div className=" w-full flex flex-col items-start justify-center">
        <h2 className="flex items-center justify-start gap-1">
          {prodName}
          <span>({prodQuality})</span>
        </h2>
        <h3>Quantity {products}</h3>
        <span>${(prodPrice * products).toFixed(2)}</span>
      </div>
      <span className="text-2xl cursor-pointer">
        <MdDelete />
      </span>
    </div>
  );
};

export default CartProductList;
