import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './Control.scss';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import './rc-slider.css';
import * as controlTypes from '../controls';
import { SliderPicker } from 'react-color';
import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const SliderWithTooltip = createSliderWithTooltip(Slider);

class Control extends PureComponent {
  static propsTypes = {
    control: PropTypes.shape({
      type: PropTypes.string.isRequired,
      initialValue: PropTypes.oneOfType([PropTypes.string,
      PropTypes.number]).isRequired
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string,
    PropTypes.number]).isRequired,
  }

  render() {
    const control = this.props.control;
    let renderControl = null;

    switch (control.type) {
      case controlTypes.number:
        renderControl = <SliderWithTooltip
          min={control.minValue}
          max={control.maxValue}
          defaultValue={control.initialValue}
          value={this.props.value}
          tipFormatter={value => `${value}${control.units}`}
          onChange={this.props.handleChange} />;
        break;
      case controlTypes.color:
        renderControl = <SliderPicker
          color={this.props.value}
          onChangeComplete={(value) => {
            this.props.handleChange(value.hex)
          }} />;
        break;
      default: break;
    }
    return (
      <div className={styles.NumberControl} >
        <label className={styles.Label}>
          <span>{control.label}</span>
          <span>{this.props.value}{control.units}</span>
        </label>
        {renderControl}
      </div>
    );
  }
}

export default Control;