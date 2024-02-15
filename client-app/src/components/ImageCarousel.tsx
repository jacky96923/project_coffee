import React, { useState } from "react";

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="flex items-center	">
      <button className="mr-2 p-2 bg-gray-200 rounded-2xl		" onClick={handlePrev}>
        &lt;
      </button>
      <div className="relative">
        <img
          src={images[currentIndex]}
          alt="carousel"
          className="w-72 h-auto rounded-2xl		 "
        />
        <div className="absolute inset-0 bg-black opacity-50 rounded-2xl	"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white text-2xl font-bold text-base	">
          今天可享雙倍積分
        </div>
      </div>

      <button className="ml-2 p-2 bg-gray-200 rounded-2xl		" onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
};

export default ImageCarousel;
