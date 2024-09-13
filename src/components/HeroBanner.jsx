"use client";
import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import { RotatingLines } from "react-loader-spinner";

const HeroBanner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const carouselImgUrl = [
    "/Images/Banner6.jpeg",
    "/Images/Banner2.jpeg",
    "/Images/Banner3.jpeg",
    "/Images/Banner4.jpeg",
    "/Images/Banner5.jpeg",
    "/Images/Banner1.jpeg",
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-full h-[16rem] md:h-full py-6 md:py-10">
          <Carousel
            responsive={responsive}
            infinite={true}
            arrows={true}
            swipeable={true}
            autoPlay={true}
            autoPlaySpeed={2500}
            renderButtonGroupOutside={true}
            containerClass="w-full h-full rounded-md">
            {carouselImgUrl.map((item, key) => (
              <div key={key} className="w-full h-[35rem] relative">
                <Image
                  src={item}
                  fill
                  priority
                  alt={`Banner image ${key + 1}`}
                  className="rounded-md object-cover"
                />
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full min-h-[35rem] md:h-full py-6 md:py-10">
          <span className="text-black">
            <RotatingLines
              visible={true}
              height="96"
              width="96"
              color="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />
          </span>
        </div>
      )}
    </>
  );
};

export default HeroBanner;
