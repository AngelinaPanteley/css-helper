"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { expect as chaiExpect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
import Modal from '../../hoc/Modal/Modal';
import SaveModal from './SaveModal.js';

configure({ adapter: new Adapter() });

describe('>>>SaveModal', () => {

  //SNAPSHOTS

  const props = {
    isOpen: true,
    onClose: () => { },
  };

  const modalComponent = <SaveModal {...props} />;

  const component = renderer.create(modalComponent);

  it('renders save modal correctly', () => {
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
  });

  //SHALLOW RENDERING

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(modalComponent);
  });

  it('renders modal hoc', () => {
    chaiExpect(wrapper.find(Modal)).to.have.lengthOf(1);
  });

  it('renders one form', () => {
    chaiExpect(wrapper.find('form')).to.have.lengthOf(1);
  });
})