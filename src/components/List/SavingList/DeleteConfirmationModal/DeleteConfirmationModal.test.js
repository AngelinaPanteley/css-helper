"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { expect as chaiExpect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
import DeleteConfirmationModal from './DeleteConfirmationModal.js';

configure({ adapter: new Adapter() });

describe('>>>DeleteConfirmationModal', () => {

  //SNAPSHOTS

  const props = {
    isOpen: true,
    onClose: () => { },
    onConfirm: () => { },
  };

  const modalComponent = <DeleteConfirmationModal {...props} />;
  const component = renderer.create(modalComponent);

  it('renders correctly', () => {
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
  });

  //SHALLOW RENDERING

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(modalComponent);
  });

  it('renders Modal', () => {
    chaiExpect(wrapper.find('Modal')).to.have.lengthOf(1);
  });

  it('renders two buttons', () => {
    chaiExpect(wrapper.find('button')).to.have.lengthOf(2);
  });
});
