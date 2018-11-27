"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { expect as chaiExpect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
import styles from './Hint.scss';
import Hint from './Hint.js';
import Icon from '../../UI/Icon/Icon.js'

configure({ adapter: new Adapter() });

describe('>>>Hint', () => {

  //SNAPSHOTS

  const props = {
    isOpen: true,
    isError: true,
    onClose: () => { },
  };

  const hintComponent = <Hint {...props} />;

  const component = renderer.create(hintComponent);

  it('renders save hint correctly', () => {
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
  });

  //SHALLOW RENDERING

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(hintComponent);
  });

  it('renders close button with cross icon', () => {
    chaiExpect(wrapper.contains(
      <button className={styles.Cross} onClick={props.onClose}>
        <Icon icon='plus' />
      </button>
    )).to.equal(true);
  });
})