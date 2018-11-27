"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { expect as chaiExpect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
import styles from './Icon.scss';
import Icon from './Icon.js';

configure({ adapter: new Adapter() });

describe('>>>Icon', () => {

  //SNAPSHOTS

  const props = {
    icon: 'edit',
  };

  const iconComponent = <Icon {...props} />;

  const component = renderer.create(iconComponent);

  it('renders itself correctly', () => {
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
  });

  //SHALLOW RENDERING

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(iconComponent);
  });

  it('renders correct icon', () => {
    chaiExpect(wrapper.contains(
      <i className={`${styles.icon} ${styles['icon_' + props.icon]}`} />
    )).to.equal(true);
  });
})