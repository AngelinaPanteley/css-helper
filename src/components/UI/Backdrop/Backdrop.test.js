"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { expect as chaiExpect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';

import Backdrop from './Backdrop.js';

configure({ adapter: new Adapter() });

describe('>>>Backdrop', () => {

  //SNAPSHOTS

  const props = {
    show: true,
    withBackground: true,
    clicked: () => { },
  };

  const backdropComponent = <Backdrop {...props} />;

  const component = renderer.create(backdropComponent);

  it('renders itself correctly', () => {
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
  });
})