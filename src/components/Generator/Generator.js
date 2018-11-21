import React, { PureComponent } from 'react';

import styles from './Generator.scss';

import Control from './Control/Control';

class Generator extends PureComponent {
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
        {controls}
      </div>
    );
  }
}

export default Generator;