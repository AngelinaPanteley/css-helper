import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './Breadcrumbs.scss';

class Breadcrumbs extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  }

  render() {
    const { pageNumber, pageAmount } = this.props;
    const optionArray = [];

    for (let i = 0; i < pageAmount; ++i) {
      optionArray.push(<option key={i + 1} value={i + 1}>{i + 1}</option>);
    }

    return (
      <div className={styles.Wrapper}>
        <button className={styles.Link}
          onClick={() => { this.props.onChange(pageNumber - 1) }}
          disabled={pageNumber - 1 === 0}>
          &lt;&nbsp;&nbsp;&nbsp;Prev
        </button>
        <select value={pageNumber}
          onChange={(e) => { this.props.onChange(+e.target.value) }}>
          {optionArray}
        </select>
        <button className={styles.Link}
          onClick={() => { this.props.onChange(pageNumber + 1) }}
          disabled={pageNumber + 1 > pageAmount}>
          Next&nbsp;&nbsp;&nbsp;&gt;
          </button>
      </div>
    )
  }
}

export default Breadcrumbs;