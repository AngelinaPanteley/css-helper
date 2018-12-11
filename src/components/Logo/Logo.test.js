"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { expect as chaiExpect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
import { Link } from 'react-router-dom';
import styles from './Logo.scss';
import logoImg from '../../assets/images/logo.png';
import Logo from './Logo.js';
import { MemoryRouter } from "react-router-dom";

configure({ adapter: new Adapter() });

describe('>>>Logo', () => {

  //SNAPSHOTS

  const logoComponent = <MemoryRouter><Logo /></MemoryRouter>;
  const component = renderer.create(logoComponent);

  it('renders logo correctly', () => {
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
  });

  //SHALLOW RENDERING

  let wrapper;
  const shallowComponent = <Logo />;

  beforeEach(() => {
    wrapper = shallow(shallowComponent);
  });

  it('renders link and image of logo', () => {
    chaiExpect(wrapper.contains(
      <Link to='/' className={styles.Logo}>
        <img src={logoImg} alt="logo" className={styles.Logo_image} />
      </Link>
    )).to.equal(true);
  });

})