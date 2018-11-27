"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { expect as chaiExpect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
import { MemoryRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import SavingItem from './SavingItem.js';
import reducer from '../../../../store/reducers/index';
import Icon from '../../../UI/Icon/Icon.js';
import OpenedSavingItem from '../../../../containers/OpenedSavingItem/OpenedSavingItem.js';

configure({ adapter: new Adapter() });

const store = createStore(reducer);

describe('>>>SavingItem', () => {

  //SNAPSHOTS

  const props = {
    isOpen: true,
    item: {
      id: '12345',
      title: 'title',
    },
    onClick: () => { },
    onEdit: () => { },
    onDelete: () => { },
  };

  const itemComponent = <Provider store={store}><MemoryRouter>
    <SavingItem {...props} />
  </MemoryRouter></Provider>;

  const component = renderer.create(itemComponent);

  it('renders correctly', () => {
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
  });

  //SHALLOW RENDERING

  let wrapper;
  const shallowComponent = <SavingItem {...props} />;

  beforeEach(() => {
    wrapper = shallow(shallowComponent);
  });

  it('renders two icons', () => {
    chaiExpect(wrapper.find(Icon)).to.have.lengthOf(2);
  });
  it('renders opened saving item if isOpen=true', () => {
    chaiExpect(wrapper.find(OpenedSavingItem)).to.have.lengthOf(1);
  });
});
