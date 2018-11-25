import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './Generator.scss';

import Control from './Control/Control';

class Generator extends PureComponent {
  static propsTypes = {
    controls: PropTypes.object.isRequired,
    controlValues: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
  }

  render() {
    const controls = [];
    for (let cont in this.props.controls) {
      const control = this.props.controls[cont];
      controls.push(<Control
        control={control}
        key={control.label}
        value={this.props.controlValues[cont]}
        handleChange={(value) => this.props.handleChange(cont, value)} />);
    }

    return (
      <div className={styles.Generator} >
        <button onClick={this.props.onClear}
          className={styles.ClearButton}>
          Clear All
        </button>
        {controls}
      </div>
    );
  }
}

export default Generator;