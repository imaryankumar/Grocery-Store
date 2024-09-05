"use client";
import Link from "next/link";
import { RiShoppingBag3Line } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ProductsItems from "../../public/json/ProductsItems.json";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import CartProductList from "@/utils/CartProductList";
import { MdOutlineToggleOff, MdOutlineToggleOn } from "react-icons/md";
import { toggleDarkMode } from "@/libs/features/darkModeSlice";

const Headers = () => {
  const [isShowCategory, setIsShowCategory] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const categoryRef = useRef();
  const slidebarRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart);
  // console.log("DarkMode", mode);
  // console.log("cartItems===>", cartItems);
  const IsShowCategorySection = () => {
    setIsShowCategory((prev) => !prev);
  };
  const onLoginBtnHandler = () => {
    router.push("/login");
  };
  const onProductCategoryHandler = (id) => {
    router.push(`/shop/${id}`);
    setIsShowCategory(false);
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

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (slidebarRef.current && !slidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [slidebarRef]);

  const onSlideModalOpen = () => {
    setIsSidebarOpen(true);
  };
  const onDarkModeHandler = () => {
    dispatch(toggleDarkMode());
    setIsDarkMode((prev) => !prev);
  };
  return (
    <>
      <nav
        className={`w-full flex items-center justify-between px-10 shadow h-20 text-xl sticky top-0 z-50 bg-slate-50`}>
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
          <div className="w-auto relative hidden lg:block" ref={categoryRef}>
            <div
              className="display-flex gap-2 bg-slate-200 py-2 px-12 rounded-full relative cursor-pointer"
              onClick={IsShowCategorySection}>
              <BiCategory className="text-xl" />
              <span className="text-xl select-none">Category</span>
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
          <span
            className="text-[3rem] cursor-pointer"
            onClick={onDarkModeHandler}>
            {isDarkMode ? <MdOutlineToggleOff /> : <MdOutlineToggleOn />}
          </span>
          <div
            className="display-flex gap-3 cursor-pointer select-none"
            onClick={onSlideModalOpen}>
            <RiShoppingBag3Line size={35} />
            <span className="text-2xl">
              {cartItems.reduce((sum, item) => sum + item.products, 0)}
            </span>
          </div>
          <button
            className="bg-green-500 text-white rounded px-6 py-2"
            onClick={onLoginBtnHandler}>
            Login
          </button>
        </div>
      </nav>
      <div
        className={`fixed top-0 right-0 h-full bg-slate-200 transition-all duration-300 z-[10000] ${
          isSidebarOpen ? "w-1/5" : "w-0"
        } `}
        ref={slidebarRef}>
        <div className="p-3 border w-full h-full">
          <span
            className=" w-full flex items-center justify-end text-2xl cursor-pointer"
            onClick={() => setIsSidebarOpen(false)}>
            <RxCross2 />
          </span>
          <button className="bg-green-500 w-full my-2 py-2 rounded-md text-white font-semibold">
            My Cart
          </button>
          <div className="w-full h-full flex flex-col items-center justify-start gap-2 py-4 ">
            {cartItems?.map((item) => {
              return (
                <CartProductList
                  key={item.id}
                  prodName={item.name}
                  prodImg={item.prodImg}
                  prodPrice={item.prodPrice}
                  prodQuality={item.prodQuality}
                  products={item.products}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Headers;
