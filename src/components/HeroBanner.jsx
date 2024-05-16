"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const HeroBanner = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 0 },
      items: 1,
    },
  };
  return (
    <Carousel responsive={responsive} infinite={true} containerClass="w-full">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
      <div>Item 4</div>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
      <div>Item 4</div>
    </Carousel>
  );
};

export default HeroBanner;
