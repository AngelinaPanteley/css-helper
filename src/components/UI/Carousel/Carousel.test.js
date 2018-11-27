"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { expect as chaiExpect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
import Carousel from './Carousel.js';
import { MemoryRouter } from "react-router-dom";

configure({ adapter: new Adapter() });

describe('>>>Carousel', () => {

  //SNAPSHOTS

  const props = {
    slides: [{
      imageUrl: 'image.png',
      route: '/route',
      title: 'title',
    }],
    onClick: () => { },
  }

  const carouselComponent = <MemoryRouter><Carousel {...props} /></MemoryRouter>;

  const component = renderer.create(carouselComponent);

  it('renders itself correctly', () => {
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
  });

  //SHALLOW RENDERING

  let wrapper;
  const shallowComponent = <Carousel {...props} />;

  beforeEach(() => {
    wrapper = shallow(shallowComponent);
  });

  it('renders background image', () => {
    chaiExpect(wrapper.contains(
      <img src={props.slides[0].imageUrl} alt='Editor Background' />
    )).to.equal(true);
  });

})