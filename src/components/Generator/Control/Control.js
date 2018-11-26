import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './Control.scss';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import './rc-slider.css';
import * as controlTypes from '../controls';
import { ChromePicker } from 'react-color';
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

  rgbToString = (rgb) => {
    if (rgb.a === 0) {
      return 'transparent';
    }
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
  }

  stringToRgb = (str) => {
    if (str === 'transparent') {
      return { r: 0, g: 0, b: 0, a: 0 };
    }
    const array = str.slice(5, -1).split(',');
    const rgb = {
      r: +array[0],
      g: +array[1],
      b: +array[2],
      a: +array[3],
    }
    return rgb;
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
        renderControl = <ChromePicker
          color={this.stringToRgb(this.props.value)}
          onChangeComplete={(value) => {
            this.props.handleChange(this.rgbToString(value.rgb))
          }} />;
        break;
      default: break;
    }
    return (
      <div className={styles.Control} >
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