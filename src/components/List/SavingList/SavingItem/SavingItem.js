import React, { PureComponent } from 'react';

import styles from './SavingItem.scss';
import Icon from '../../../UI/Icon/Icon';
import Auxiliary from '../../../../hoc/Auxiliary/Auxiliary';
import OpenedSavingItem from '../../../../containers/OpenedSavingItem/OpenedSavingItem';

class SavingItem extends PureComponent {
  render() {
    const item = this.props.item;
    return (
      <Auxiliary>
        <div className={styles.Item}
          onClick={() => this.props.onClick(item.id)}>
          {item.title}
          <div className={styles.ButtonContainer}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                this.props.onEdit(item.id);
              }}
              className={styles.Button}>
              <Icon icon='edit' />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                this.props.onDelete(item.id);
              }}
              className={styles.Button}>
              <Icon icon='delete' />
            </button>
          </div>
        </div>
        {
          this.props.isOpen &&
          <OpenedSavingItem item={item} />
        }
      </Auxiliary>
    )
  }
}

export default SavingItem;