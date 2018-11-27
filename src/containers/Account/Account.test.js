"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { expect as chaiExpect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
import { MemoryRouter, Link } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Account from './Account.js';
import reducer from '../../store/reducers/index';

configure({ adapter: new Adapter() });

const store = createStore(reducer);

describe('>>>Account', () => {

  //SNAPSHOTS

  const props = {
    onLogout: () => { },
  }

  const accountComponent = <Provider store={store}>
    <MemoryRouter>
      <Account {...props} />
    </MemoryRouter>
  </Provider>;

  const component = renderer.create(accountComponent);

  it('renders itself correctly', () => {
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
  });
});
