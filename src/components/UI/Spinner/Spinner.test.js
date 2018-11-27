"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { expect as chaiExpect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
import styles from './Spinner.scss';
import Spinner from './Spinner.js';

configure({ adapter: new Adapter() });

describe('>>>Spinner', () => {

  //SNAPSHOTS

  const spinnerComponent = <Spinner />;

  const component = renderer.create(spinnerComponent);

  it('renders itself correctly', () => {
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
  });

  //SHALLOW RENDERING

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(spinnerComponent);
  });

  it('renders correct loader', () => {
    chaiExpect(wrapper.contains(
      <div className={styles.Loader}>Loading...</div>
    )).to.equal(true);
  });
})