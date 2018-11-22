import React, { PureComponent } from 'react';

import styles from './Breadcrumbs.scss';

class Breadcrumbs extends PureComponent {
  render() {
    const { pageNumber, pageAmount } = this.props;
    const optionArray = [];
    for (let i = 0; i < pageAmount; ++i) {
      optionArray.push(<option key={i + 1} value={i + 1}>{i + 1}</option>);
    }

    return (
      <div>
        <button
          onClick={() => { this.props.onChange(pageNumber - 1) }}
          disabled={pageNumber - 1 === 0}>
          Prev
        </button>
        <select value={pageNumber}
          onChange={(e) => { this.props.onChange(+e.target.value) }}>
          {optionArray}
        </select>
        <button
          onClick={() => { this.props.onChange(pageNumber + 1) }}
          disabled={pageNumber + 1 > pageAmount}>
          Next
          </button>
      </div>
    )
  }
}

export default Breadcrumbs;