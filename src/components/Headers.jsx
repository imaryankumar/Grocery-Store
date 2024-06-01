"use client";
import Link from "next/link";
import { RiShoppingBag3Line } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ProductsItems from "../../public/json/ProductsItems.json";
import Image from "next/image";

const Headers = () => {
  const [isShowCategory, setIsShowCategory] = useState(false);
  const categoryRef = useRef();
  const router = useRouter();
  const IsShowCategorySection = () => {
    setIsShowCategory((prev) => !prev);
  };
  const onLoginBtnHandler = () => {
    router.push("/login");
  };
  const onProductCategoryHandler = (id) => {
    // router.push(`shop/${id}`);
    console.log("first", `shop/${id}`);
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsShowCategory(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [categoryRef]);

  return (
    <nav className="w-full flex items-center justify-between px-10 bg-white shadow h-20 text-xl">
      <div className="text-3xl font-medium display-flex gap-8">
        <Link href={"/"} className="display-flex gap-1 text-yellow-600  ">
          <span>
            <Image
              src={"/Images/Logoicon.png"}
              alt="Logo"
              width={50}
              height={50}
            />
          </span>
          <div className="leading-7">
            Grocery <br /> <span className="text-green-500">Store</span>
          </div>
        </Link>
        <div className="w-auto relative " ref={categoryRef}>
          <div
            className="display-flex gap-2 bg-slate-200 py-2 px-12 rounded-full relative cursor-pointer"
            onClick={IsShowCategorySection}>
            <BiCategory className="text-xl" />
            <span className="text-xl">Category</span>
          </div>
          {isShowCategory && (
            <div className="absolute top-12 z-10 left-2 right-0 bg-slate-100 border h-auto w-48 rounded py-3">
              <div className="text-base flex flex-col">
                <h3 className="font-bold text-lg text-center pb-2">
                  Browse Category
                </h3>
                <div className="py-1 flex flex-col gap-4  items-start px-3">
                  {ProductsItems.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-center gap-4 cursor-pointer"
                        onClick={() =>
                          onProductCategoryHandler(item.productSlug)
                        }>
                        <Image
                          src={item.productImage}
                          width={35}
                          height={35}
                          alt={item.productName}
                        />
                        <p className="hover:text-green-500 font-medium">
                          {item.productName}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-72 py-1.5 px-4 bg-white border border-gray-500 rounded-full display-flex ">
          <IoSearchOutline />
          <input
            className="w-full h-full placeholder-black outline-none border-none bg-transparent text-lg px-2 text-black "
            placeholder="Search"
          />
        </div>
      </div>
      <div className="display-flex gap-10">
        <div className="display-flex gap-3">
          <RiShoppingBag3Line size={35} />
          <span className="text-2xl">0</span>
        </div>
        <button
          className="bg-green-500 text-white rounded px-6 py-2"
          onClick={onLoginBtnHandler}>
          Login
        </button>
      </div>
    </nav>
  );
};

export default Headers;
