"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { expect as chaiExpect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
import Example from './Example.js';

configure({ adapter: new Adapter() });

describe('>>>Example', () => {

  //SNAPSHOTS

  const props = {
    styles: {
      border: '1px solid blue'
    },
    isSelected: true,
    selectExample: () => { },
    exampleName: 'name',
    template: '<div class="previewClass"></div>',
    previewClass: 'previewClass',
  };

  const exampleComponent = <Example {...props} />;

  const component = renderer.create(exampleComponent);

  it('renders example correctly', () => {
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
  });

  //SHALLOW RENDERING

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(exampleComponent);
  });

  it('renders Preview', () => {
    chaiExpect(wrapper.find('Preview')).to.have.lengthOf(1);
  });
})