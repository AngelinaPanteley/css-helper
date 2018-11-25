import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './Hint.scss';
import Icon from '../Icon/Icon';

class Hint extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    isError: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
  }

  render() {
    const hintStyles = [styles.Hint];
    if (this.props.isOpen) {
      hintStyles.push(styles.Open);
      this.timer = setTimeout(this.props.onClose, 2000);
    } else {
      hintStyles.push(styles.Close);
      clearTimeout(this.timer);
    }
    return (
      <div className={hintStyles.join(' ')}
        style={{ background: this.props.isError ? '#bf1039' : '#19b319' }}>
        {this.props.entryText}
        <button className={styles.Cross} onClick={this.props.onClose}>
          <Icon icon='plus' />
        </button>
      </div>
    )
  }
}

export default Hint;