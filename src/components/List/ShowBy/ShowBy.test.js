"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { expect as chaiExpect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';

import ShowBy from './ShowBy.js';

configure({ adapter: new Adapter() });

describe('>>>ShowBy', () => {

  //SNAPSHOTS

  const props = {
    value: '10',
    onChange: () => { },
    length: 20,
  };

  const showByComponent = <ShowBy {...props} />;

  const component = renderer.create(showByComponent);

  it('renders correctly', () => {
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
  });

  //SHALLOW RENDERING

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(showByComponent);
  });

  it('renders select', () => {
    chaiExpect(wrapper.find('select')).to.have.lengthOf(1);
  });
  it('renders two options', () => {
    chaiExpect(wrapper.find('option')).to.have.lengthOf(4);
  });
});
