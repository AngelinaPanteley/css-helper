"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { expect as chaiExpect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';

import Code from './Code.js';

configure({ adapter: new Adapter() });

describe('>>>Code', () => {

  //SNAPSHOTS

  const props = {
    styles: {
      border: '1px solid blue'
    },
    previewClass: 'previewClass',
    onCopy: () => { },
    template: '<div class="previewClass"></div>',
  };

  const codeComponent = <Code {...props} />;

  const component = renderer.create(codeComponent);

  it('renders code correctly', () => {
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
  });

  //SHALLOW RENDERING

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(codeComponent);
  });

  it('renders two patterns', () => {
    chaiExpect(wrapper.find('Pattern')).to.have.lengthOf(2);
  });
})