"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { expect as chaiExpect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';

import Examples from './Examples.js';

configure({ adapter: new Adapter() });

describe('>>>Examples', () => {

  //SNAPSHOTS

  const props = {
    styles: {
      border: '1px solid blue'
    },
    selectExample: () => { },
    template: '<div class="previewClass"></div>',
    previewClass: 'previewClass',
    examples: {
      example: {}
    },
    initialControlValues: {},
    controls: {},
    isOpen: true,
  };

  const exampleComponent = <Examples {...props} />;

  const component = renderer.create(exampleComponent);

  it('renders examples correctly', () => {
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
  });

  //SHALLOW RENDERING

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(exampleComponent);
  });

  it('renders example(s)', () => {
    chaiExpect(wrapper.find('Example')).to.have.lengthOf(1);
  });
})