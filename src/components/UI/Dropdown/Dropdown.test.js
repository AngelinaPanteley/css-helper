"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { expect as chaiExpect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
import Dropdown from './Dropdown.js';
import { MemoryRouter, Link } from "react-router-dom";
configure({ adapter: new Adapter() });

describe('>>>Dropdown', () => {

  //SNAPSHOTS

  const props = {
    isOpen: true,
    onClick: () => { },
    onClose: () => { },
    left: true,
    right: false,
    links: [{
      title: 'title',
      route: '/route',
    }],
  }

  const dropdownComponent = <MemoryRouter><Dropdown {...props} /></MemoryRouter>;

  const component = renderer.create(dropdownComponent);

  it('renders itself correctly', () => {
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
  });

  //SHALLOW RENDERING

  let wrapper;
  const shallowComponent = <Dropdown {...props} />;

  beforeEach(() => {
    wrapper = shallow(shallowComponent);
  });

  it('renders list of links', () => {
    chaiExpect(wrapper.find('ul')).to.have.lengthOf(1);
  });

})