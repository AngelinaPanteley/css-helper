"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { expect as chaiExpect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
import LinkTo from './LinkTo.js';
import { MemoryRouter, Link } from "react-router-dom";
configure({ adapter: new Adapter() });

describe('>>>LinkTo', () => {

  //SNAPSHOTS

  const props = {
    route: '/route',
    onClick: () => { },
  }

  const linkComponent = <MemoryRouter><LinkTo {...props} /></MemoryRouter>;

  const component = renderer.create(linkComponent);

  it('renders itself correctly', () => {
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
  });

  //SHALLOW RENDERING

  let wrapper;
  const shallowComponent = <LinkTo {...props} />;

  beforeEach(() => {
    wrapper = shallow(shallowComponent);
  });

  it('renders Link', () => {
    chaiExpect(wrapper.find(Link)).to.have.lengthOf(1);
  });

})