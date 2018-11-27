"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { expect as chaiExpect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
import MyTabs from './Tabs.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
configure({ adapter: new Adapter() });

describe('>>>Tabs', () => {

  //SNAPSHOTS

  const props = {
    tabs: ['tab1', 'tab2'],
  }

  const tabsComponent = <MyTabs {...props}>
    <div>Panel1</div>
    <div>Panel2</div>
  </MyTabs>
    ;

  const component = renderer.create(tabsComponent);

  it('renders itself correctly', () => {
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
  });

  //SHALLOW RENDERING

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(tabsComponent);
  });

  it('renders Tabs', () => {
    chaiExpect(wrapper.find(Tabs)).to.have.lengthOf(1);
  });

  it('renders TabList', () => {
    chaiExpect(wrapper.find(TabList)).to.have.lengthOf(1);
  });

  it('renders Tab components', () => {
    chaiExpect(wrapper.find(Tab)).to.have.lengthOf(2);
  });

  it('renders TabPanel components', () => {
    chaiExpect(wrapper.find(TabPanel)).to.have.lengthOf(2);
  });

})