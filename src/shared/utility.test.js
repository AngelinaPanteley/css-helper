"use strict";

import { configure } from 'enzyme';
import { expect as chaiExpect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.1';
import { updateObject, calcStyles } from './utility.js';

configure({ adapter: new Adapter() });

describe('>>>updateObject', () => {
  it('updates object immutably', () => {
    const state = {
      key1: {
        subkey: 1,
      },
      key2: {
        subkey: 2,
      },
    };

    const updated = updateObject(state, { key2: { subkey: 2 } });

    chaiExpect(updated.key2 == state.key2).to.equal(false);
  });
});

describe('>>>calcStyles', () => {
  it('calculates styles correctly', () => {
    const styles = {
      border: '{borderWidth} solid {borderColor}',
    };

    const controlValues = {
      borderWidth: 1,
      borderColor: '#fff',
    };

    const controls = {
      borderWidth: {
        type: 'number',
        units: 'px',
      },
      borderColor: {
        type: 'color',
      },
    };

    const calculated = calcStyles(styles, controlValues, controls);
    const correct = {
      border: '1px solid #fff',
    };

    chaiExpect(calculated.border == correct.border).to.equal(true);
  });
});