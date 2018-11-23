import React, { PureComponent } from 'react';

import styles from './SavingList.scss';
import SavingItem from './SavingItem/SavingItem';

class SavingList extends PureComponent {
  render() {
    return (
      <div>
        {this.props.items.map((item) => {
          return <SavingItem
            key={item.id}
            item={item}
            onEdit={this.props.onEdit}
            onDelete={this.props.onDelete} />
        })}
      </div>
    )
  }
}

export default SavingList;