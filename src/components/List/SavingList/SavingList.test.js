"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { expect as chaiExpect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
import { MemoryRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import SavingList from './SavingList.js';
import reducer from '../../../store/reducers/index';

configure({ adapter: new Adapter() });

const store = createStore(reducer);

describe('>>>SavingList', () => {

  //SNAPSHOTS

  const props = {
    openItem: 'openItemId',
    items: [
      {
        id: '12345',
        title: 'title',
      }
    ],
    onClick: () => { },
    onEdit: () => { },
    onDelete: () => { },
  };

  const listComponent = <Provider store={store}><MemoryRouter>
    <SavingList {...props} />
  </MemoryRouter></Provider>;

  const component = renderer.create(listComponent);

  it('renders correctly', () => {
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
  });

  //SHALLOW RENDERING

  let wrapper;
  const shallowComponent = <SavingList {...props} />;

  beforeEach(() => {
    wrapper = shallow(shallowComponent);
  });

  it('renders SavingItems', () => {
    chaiExpect(wrapper.find('SavingItem')).to.have.lengthOf(1);
  });
});
