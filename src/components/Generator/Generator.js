import React, { PureComponent } from 'react';

import styles from './Generator.scss';
import * as controlTypes from './controls.js';

import NumberControl from './NumberControl/NumberControl';

class Generator extends PureComponent {
  render() {
    const controls = [];
    for (let cont in this.props.controls) {
      const control = this.props.controls[cont];
      switch (control.type) {
        case controlTypes.number:
          controls.push(<NumberControl
            name={cont}
            control={control}
            key={control.label}
            value={this.props.controlValues[cont]}
            handleChange={this.props.handleChange} />);
      }
    }

    return (
      <div className={styles.Generator} >
        {controls}
      </div>
    );
  }
}

export default Generator;