"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
import { MemoryRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Control from './Control.js';
import reducer from '../../../store/reducers/index';

configure({ adapter: new Adapter() });

const store = createStore(reducer);

describe('>>>Control', () => {

  //SNAPSHOTS

  const props = {
    control: {
      type: 'number',
      initialValue: 30,
    },
    handleChange: () => { },
    value: 30,
  };

  const controlComponent = <Provider store={store}><MemoryRouter>
    <Control {...props} />
  </MemoryRouter></Provider>

  const component = renderer.create(controlComponent);

  it('renders control correctly', () => {
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
  });
});
