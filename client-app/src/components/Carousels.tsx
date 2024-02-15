import React from "react";
import ImageCarousel from "./ImageCarousel";

const App = () => {
  const images = [
    "https://rare-gallery.com/thumbs/510549-coffee.jpg",
    "https://rare-gallery.com/thumbs/5410468-person-hand-coffee-coffee-bean-holding-hold-caffeine-tattoo-coffee-pro-coffee-addict-coffee-shop-free-stock-photos.jpg",
    "https://rare-gallery.com/thumbs/5425871-mountain-cup-drink-hand-holding-mug-coffee-tea-arms-tree-woodland-forest-travel-hiking-valley-explore-rei-bar-nine-coffee-bean-coffee-addict-public-domain-images.jpg",
  ];

  return <ImageCarousel images={images} />;
};

export default App;
