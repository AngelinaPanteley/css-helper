import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './ShowBy.scss';

class ShowBy extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired,
  }

  render() {
    return (
      <div className={styles.Wrapper}>
        <p>Show by
          <select value={this.props.value}
            onChange={(e) => this.props.onChange(e.target.value)}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          /{this.props.length}
        </p>
      </div>
    )
  }
}

export default ShowBy;