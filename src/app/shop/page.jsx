"use client";
import PopularListProduct from "@/utils/PopularListProduct";
import axios from "axios";
import { useEffect, useState, useRef, useCallback } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const Shop = () => {
  const sortProductsName = [
    "Recommended",
    "Popularity",
    "Better Discount",
    "Price: Low to High",
    "Price: High to Low",
  ];
  const [productDetail, setProductDetail] = useState([]);
  const [isOutSideClick, setIsOutSideClick] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const sortRef = useRef();

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/products?page=${pageNum}&limit=8`
      );
      const resData = response?.data?.allProductsFind;
      setProductDetail((prevProducts) => [...prevProducts, ...resData]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [pageNum]);

  useEffect(() => {
    if (pageNum <= 5) {
      fetchData();
    }
  }, [fetchData, pageNum]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsOutSideClick(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [sortRef]);

  const loadMoreProducts = useCallback((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setPageNum((prevPageNum) => prevPageNum + 1);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(loadMoreProducts, {
      threshold: 0.5,
    });
    const observerElement = document.querySelector("#loadmore");
    if (observerElement) {
      observer.observe(observerElement);
    }
    return () => {
      if (observerElement) {
        observer.unobserve(observerElement);
      }
    };
  }, [loadMoreProducts]);

  return (
    <div className="w-full h-full flex items-start justify-between px-10 py-5">
      <div className="w-[15%] h-full">
        <h2 className="text-xl font-semibold">FILTERS</h2>
        <div className="mt-5">
          <h2>CATEGORIES</h2>
        </div>
      </div>
      <div className="w-full h-full">
        <div className="w-full h-auto flex items-center justify-between">
          <h2 className="text-3xl font-semibold"> GROCERY SHOP</h2>
          <div
            className="relative py-1.5 px-3 w-60 border cursor-pointer rounded-sm flex items-center justify-between"
            onClick={() => setIsOutSideClick(true)}
            ref={sortRef}>
            <p className="w-auto">
              Sort by: <span className="font-medium">Recommended</span>
            </p>
            <span className="text-3xl">
              {isOutSideClick ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
            </span>
            {isOutSideClick && (
              <div className="absolute top-10 right-0 left-0 w-60 py-3 border flex flex-col items-start justify-start z-10 bg-white">
                {sortProductsName.map((item) => (
                  <span
                    className="hover:bg-slate-100 h-full w-full px-3 py-1"
                    key={item}>
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="relative mt-5 w-full h-full">
          <div className="grid grid-cols-4 gap-8">
            {productDetail.map((item) => (
              <PopularListProduct
                key={item._id}
                id={item._id}
                productImage={item.prodImgurl}
                productName={item.productName}
                productReguPrice={item.regularPrice}
                productBasePrice={item.basePrice}
                productQuantity={item.productQuantity}
                productCategory={item.productCategory}
                productDescr={item.productDescription}
              />
            ))}
          </div>
          {pageNum <= 5 && (
            <div
              id="loadmore"
              className="w-full h-full flex items-center justify-center pt-10">
              <p className="text-center">Loading more products...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
