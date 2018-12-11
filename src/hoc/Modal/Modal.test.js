"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { expect as chaiExpect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
import Modal from './Modal.js';
import Backdrop from '../../components/UI/Backdrop/Backdrop.js';

configure({ adapter: new Adapter() });

describe('>>>Tabs', () => {

  //SNAPSHOTS

  const props = {
    isOpen: true,
    onClose: () => { },
  }

  const modalComponent = <Modal {...props}>
    <div>Child</div>
  </Modal>;

  const component = renderer.create(modalComponent);

  it('renders itself correctly', () => {
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
  });

  //SHALLOW RENDERING

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(modalComponent);
  });

  it('renders Backdrop', () => {
    chaiExpect(wrapper.find(Backdrop)).to.have.lengthOf(1);
  });
})