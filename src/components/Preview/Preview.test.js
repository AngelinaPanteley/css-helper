"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';

import Preview from './Preview.js';

configure({ adapter: new Adapter() });

describe('>>>Preview', () => {

  //SNAPSHOTS

  const props = {
    template: "<div class='template'></div>",
    previewClass: 'template',
    styles: {
      border: '1px solid gray',
    },
  };

  const previewComponent = <Preview {...props} />;

  const component = renderer.create(previewComponent);

  it('renders preview correctly', () => {
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
  });
})