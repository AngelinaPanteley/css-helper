"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { expect as chaiExpect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
import { MemoryRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Header from './Header.js';
import Menu from '../../containers/Menu/Menu.js';
import Account from '../../containers/Account/Account.js';
import Logo from '../Logo/Logo.js';
import reducer from '../../store/reducers/index';

configure({ adapter: new Adapter() });

const store = createStore(reducer);

describe('>>>Header', () => {

  //SNAPSHOTS

  const headerComponent = <Provider store={store}><MemoryRouter>
    <Header />
  </MemoryRouter></Provider>;

  const component = renderer.create(headerComponent);

  it('renders control correctly', () => {
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
  });

  //SHALLOW RENDERING

  let wrapper;
  const shallowComponent = <Header />;

  beforeEach(() => {
    wrapper = shallow(shallowComponent);
  });

  it('renders Menu', () => {
    chaiExpect(wrapper.find('div')).to.have.lengthOf(1);
  });
  it('renders Logo', () => {
    chaiExpect(wrapper.find(Logo)).to.have.lengthOf(1);
  });
  it('renders Account', () => {
    chaiExpect(wrapper.find(Account)).to.have.lengthOf(1);
  });
});
