"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { expect as chaiExpect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
import Breadcrumbs from './Breadcrumbs.js';

configure({ adapter: new Adapter() });

describe('>>>Breadcrumbs', () => {

  //SNAPSHOTS

  const props = {
    onChange: () => { },
  };

  const breadcrumbsComponent = <Breadcrumbs {...props} />;
  const component = renderer.create(breadcrumbsComponent);

  it('renders correctly', () => {
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
  });

  //SHALLOW RENDERING

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(breadcrumbsComponent);
  });

  it('renders prev and next buttons', () => {
    chaiExpect(wrapper.find('button')).to.have.lengthOf(2);
  });

  it('renders select of page number', () => {
    chaiExpect(wrapper.find('select')).to.have.lengthOf(1);
  });
});
