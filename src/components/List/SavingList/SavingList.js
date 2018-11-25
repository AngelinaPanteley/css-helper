import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './SavingList.scss';
import SavingItem from './SavingItem/SavingItem';

class SavingList extends PureComponent {
  static propTypes = {
    openItem: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className={styles.Wrapper}>
        {this.props.items.map((item) => {
          return <SavingItem
            key={item.id}
            item={item}
            isOpen={this.props.openItem === item.id}
            onEdit={this.props.onEdit}
            onDelete={this.props.onDelete}
            onClick={this.props.onClick} />
        })}
      </div>
    )
  }
}

export default SavingList;