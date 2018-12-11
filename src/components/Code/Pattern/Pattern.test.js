"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { expect as chaiExpect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
import Pattern from './Pattern.js';

configure({ adapter: new Adapter() });

describe('>>>Pattern', () => {

  //SNAPSHOTS

  const props = {
    title: 'title',
    code: 'code',
    onCopy: () => { },
  };

  const patternComponent = <Pattern {...props} />;

  const component = renderer.create(patternComponent);

  it('renders pattern correctly', () => {
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
  });

  //SHALLOW RENDERING

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(patternComponent);
  });

  it('renders code', () => {
    chaiExpect(wrapper.contains(
      <pre>
        <code>
          {props.code}
        </code >
      </pre>)).to.equal(true);
  });

  it('renders title', () => {
    chaiExpect(wrapper.contains(
      <span>{props.title}</span>
    )).to.equal(true);
  });
})