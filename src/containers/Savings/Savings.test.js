"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
import { MemoryRouter, Link } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Savings from './Savings.js';
import reducer from '../../store/reducers/index';

configure({ adapter: new Adapter() });
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
));

describe('>>>Savings', () => {

  const props = {
    isOpen: true,
    item: {
      editorName: 'filter',
    }
  }

  const savingsComponent = <Provider store={store}>
    <MemoryRouter>
      <Savings />
    </MemoryRouter>
  </Provider>;

  const component = renderer.create(savingsComponent);

  it('renders itself correctly', () => {
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
  });
});
