import React, { PureComponent } from 'react';

import styles from './NumberControl.scss';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import './rc-slider.css';

import Slider from 'rc-slider';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const SliderWithTooltip = createSliderWithTooltip(Slider);

class NumberControl extends PureComponent {
  render() {
    const control = this.props.control;
    return (
      <div className={styles.NumberControl} >
        <label className={styles.Label}>
          <span>{control.label}</span>
          <span>{this.props.value}{control.units}</span>
        </label>
        <SliderWithTooltip min={control.minValue}
          max={control.maxValue}
          defaultValue={control.initialValue}
          value={this.props.value}
          tipFormatter={value => `${value}${control.units}`}
          onChange={(value) => this.props.handleChange(this.props.name, value)} />
      </div>
    );
  }
}

export default NumberControl;