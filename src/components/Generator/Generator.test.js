"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { expect as chaiExpect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
import { MemoryRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Generator from './Generator.js';
import reducer from '../../store/reducers/index';

configure({ adapter: new Adapter() });

const store = createStore(reducer);

describe('>>>Generator', () => {

  //SNAPSHOTS

  const props = {
    controls: {
      control: {
        type: 'number',
        initialValue: 30,
      },
    },
    controlValues: {
      control: 20,
    },
    onClear: () => { },
    handleChange: () => { },
  };

  const generatorComponent = <Provider store={store}><MemoryRouter>
    <Generator {...props} />
  </MemoryRouter></Provider>;

  const component = renderer.create(generatorComponent);

  it('renders control correctly', () => {
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
  });

  //SHALLOW RENDERING

  let wrapper;
  const shallowComponent = <Generator {...props} />;

  beforeEach(() => {
    wrapper = shallow(shallowComponent);
  });

  it('renders clear button', () => {
    chaiExpect(wrapper.find('button')).to.have.lengthOf(1);
  });
});
