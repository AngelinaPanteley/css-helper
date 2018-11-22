import React, { PureComponent } from 'react';

import styles from './SavingItem.scss';

class SavingItem extends PureComponent {
  render() {
    const item = this.props.item;
    return (
      <div>
        {item.title}
        <button onClick={() => this.props.onEdit(item.id)}>Edit</button>
        <button>Delete</button>
      </div>
    )
  }
}

export default SavingItem;