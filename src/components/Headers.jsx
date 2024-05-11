"use client";
import Link from "next/link";
import { RiShoppingBag3Line } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
import { IoSearchSharp } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";

const Headers = () => {
  const [isShowCategory, setIsShowCategory] = useState(false);
  const categoryRef = useRef();
  const IsShowCategorySection = () => {
    setIsShowCategory((prev) => !prev);
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
        <div className="display-flex gap-5 text-yellow-600 ">
          <Link href={"/"}>
            Grocery <span className="text-green-400">Store</span>
          </Link>
        </div>
        <div className="w-auto relative" ref={categoryRef}>
          <div
            className="flex gap-3 bg-slate-300 py-2 px-10 rounded relative cursor-pointer"
            onClick={IsShowCategorySection}>
            <BiCategory />
            <span className="text-xl">Category</span>
          </div>
          {isShowCategory && (
            <div className="absolute top-12 left-0 right-0 bg-slate-300 h-80 w-52 rounded">
              <h3>Hello</h3>
            </div>
          )}
        </div>
        <div className="w-96 py-2 px-4 bg-slate-300 rounded display-flex">
          <IoSearchSharp />
          <input
            className="w-full h-full placeholder-black outline-none border-none bg-transparent text-xl px-2 text-black "
            placeholder="Search"
          />
        </div>
      </div>
      <div className="display-flex gap-10">
        <div className="display-flex gap-3">
          <RiShoppingBag3Line size={35} />
          <span className="text-2xl">0</span>
        </div>
        <button className="bg-green-500 text-white rounded px-6 py-2">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Headers;
