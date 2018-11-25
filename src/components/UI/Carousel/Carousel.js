import React from "react";
import PropTypes from 'prop-types';
import { Carousel } from "react-responsive-carousel";
import "./lib/carousel.css";
import './Carousel.css';
import LinkTo from '../LintTo/LinkTo';

const carousel = (props) => {
  const slides = props.slides.map((slide) => {
    return (
      <div key={slide.imageUrl}>
        <img src={slide.imageUrl} alt='Editor Background' />
        <LinkTo route={slide.route}
          onClick={props.onClick}>
          {slide.title}
        </LinkTo>
      </div>
    );
  });

  return (
    <Carousel autoPlay infiniteLoop>
      {slides}
    </Carousel>
  );
};

carousel.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
}

export default carousel;