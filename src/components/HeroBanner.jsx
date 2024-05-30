"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
const HeroBanner = () => {
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
  return (
    <div className="w-full h-[16rem] md:h-full py-6 md:py-10 ">
      <Carousel
        responsive={responsive}
        infinite={true}
        arrows={true}
        swipeable={false}
        autoPlay={true}
        autoPlaySpeed={2500}
        renderButtonGroupOutside={true}
        containerClass="w-full h-full rounded-md">
        {carouselImgUrl?.map((item, key) => {
          return (
            <div key={key} className="w-full h-[35rem] relative">
              <Image
                src={item}
                layout="fill"
                objectFit="cover"
                priority
                alt="Images"
                className="rounded-md"
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default HeroBanner;
