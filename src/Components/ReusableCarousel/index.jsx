import React from "react";
import "./carousel.css";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReuseableCarousel = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    mode: "free-snap",
    slides: {
      perView: 5.2,
      spacing: 5,
      // dragSpeed: 50,
    },
    breakpoints: {
      "(max-width: 1600px)": {
        slides: {
          perView: 4.6,
          spacing: 5,
        },
      },
      "(max-width: 1370px)": {
        slides: {
          perView: 4.4,
          spacing: 5,
        },
      },
      "(max-width: 1260px)": {
        slides: {
          perView: 4.8,
          spacing: 5,
        },
      },
      "(max-width: 1160px)": {
        slides: {
          perView: 4.6,
          spacing: 5,
        },
      },
      "(max-width: 1060px)": {
        slides: {
          perView: 4.3,
          spacing: 5,
        },
      },
      "(max-width: 1030px)": {
        slides: {
          perView: 3.8,
          spacing: 5,
        },
      },
      "(max-width: 1000px)": {
        slides: {
          perView: 3.6,
          spacing: 5,
        },
      },
      "(max-width: 940px)": {
        slides: {
          perView: 3.4,
          spacing: 5,
        },
      },
      "(max-width: 880px)": {
        slides: {
          perView: 3.4,
          spacing: 5,
        },
      },
      "(max-width: 760px)": {
        slides: {
          perView: 3.3,
          spacing: 5,
        },
      },
      "(max-width: 680px)": {
        slides: {
          perView: 2.9,
          spacing: 5,
        },
      },
      "(max-width: 660px)": {
        slides: {
          perView: 2.7,
          spacing: 5,
        },
      },
      "(max-width: 540px)": {
        slides: {
          perView: 2.4,
          spacing: 5,
        },
      },
      "(max-width: 500px)": {
        slides: {
          perView: 2.3,
          spacing: 5,
        },
      },
      "(max-width: 470px)": {
        slides: {
          perView: 2.1,
          spacing: 5,
        },
      },
      "(max-width: 435px)": {
        slides: {
          perView: 1.9,
          spacing: 5,
        },
      },
      "(max-width: 396px)": {
        slides: {
          perView: 1.8,
          spacing: 5,
        },
      },
      "(max-width: 370px)": {
        slides: {
          perView: 1.6,
          spacing: 5,
        },
      },
      drag: false,
    },
  });

  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
      !className?.includes("slick-disabled") && (
        <div className={className} onClick={onClick} />
      )
    );
  }

  const settings = {
    dots: false,
    adaptiveHeight: false,
    speed: 600,
    infinite: false,
    initialSlide: 0,
    slidesToShow: 4.3,
    autoplay: false,
    slidesToScroll: 4,
    centerMode: false,
    arrows: true,
    swipe: "ontouchstart" in document.documentElement,
    nextArrow: <SamplePrevArrow />,
    prevArrow: <SamplePrevArrow />,

    responsive: [
      {
        breakpoint: 1120,
        settings: {
          slidesToShow: 4.3,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 860,
        settings: {
          slidesToShow: 3.14,
          slidesToScroll: 3,
          centerMode: false,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3.1,
          slidesToScroll: 3,
          centerMode: false,
        },
      },
      {
        breakpoint: 510,
        settings: {
          slidesToShow: 2.75,
          slidesToScroll: 3,
          centerMode: false,
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 2.19,
          slidesToScroll: 3,
          centerMode: false,
        },
      },
      {
        breakpoint: 380,
        settings: {
          slidesToShow: 1.21,
          slidesToScroll: 3,
          centerMode: false,
        },
      },
      {
        breakpoint: 361,
        settings: {
          slidesToShow: 1.24,
          slidesToScroll: 3,
          centerMode: false,
        },
      },
      {
        breakpoint: 338,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 3,
          centerMode: false,
        },
      },
    ],
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5.3,
      slidesToSlide: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4.3,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2.3,
      slidesToSlide: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1.3,
      slidesToSlide: 4,
    },
  };

  return (
    <>
      {window.innerWidth < 800 ? (
        <div className="navigation-wrapper">
          <div className="keen-slider" ref={sliderRef}>
            {children}
          </div>
        </div>
      ) : (
        <Slider className="intro-slick" {...settings}>
          {children}
        </Slider>
      )}
    </>
  );
};

export default ReuseableCarousel;
