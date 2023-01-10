import * as React from "react";
import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";

export const ImageSlider = (props) => {
  const { images = [] } = props || {};
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...settings}>
        {images.map((img) => (
          <div key={img.id}>
            <img src={img.src} alt={`car-details-${img.id}`} height="300px" />
          </div>
        ))}
      </Slider>
    </div>
  );
};
