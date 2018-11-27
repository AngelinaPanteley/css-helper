"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { expect as chaiExpect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
import { MemoryRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Layout from './Layout.js';
import Header from '../../components/Header/Header.js';
import reducer from '../../store/reducers/index';

configure({ adapter: new Adapter() });

const store = createStore(reducer);

describe('>>>Layout', () => {

  //SNAPSHOTS

  const layoutComponent = <Provider store={store}>
    <MemoryRouter>
      <Layout>
        <div>child</div>
      </Layout>
    </MemoryRouter>
  </Provider>;

  const component = renderer.create(layoutComponent);

  it('renders itself correctly', () => {
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
  });

  //SHALLOW RENDERING

  let wrapper;
  const shallowComponent = <Layout>
    <div>child</div>
  </Layout>;

  beforeEach(() => {
    wrapper = shallow(shallowComponent);
  });

  it('renders Header', () => {
    chaiExpect(wrapper.find(Header)).to.have.lengthOf(1);
  });

});
