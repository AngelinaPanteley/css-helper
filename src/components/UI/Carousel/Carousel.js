import React from "react";
import { Carousel } from "react-responsive-carousel";
import "./lib/carousel.css";
import './Carousel.css';
import LinkTo from '../LintTo/LinkTo';

export default (props) => {
  const slides = props.slides.map((slide) => {
    return (
      <div key={slide.imageUrl}>
        <img src={slide.imageUrl} />
        <LinkTo route={slide.route}>{slide.title}</LinkTo>
      </div>
    );
  });

  return (
    <Carousel autoPlay>
      {slides}
    </Carousel>
  );
};