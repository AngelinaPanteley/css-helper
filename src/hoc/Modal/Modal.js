import React, { PureComponent } from 'react';
import styles from './Modal.scss';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Auxiliary from '../Auxiliary/Auxiliary';

class Modal extends PureComponent {
  render() {
    const attachedClasses = [styles.Modal];
    if (this.props.isOpen) {
      attachedClasses.push(styles.Open);
    } else {
      attachedClasses.push(styles.Close);
    }
    return (
      <Auxiliary>
        <Backdrop
          show={this.props.isOpen}
          clicked={this.props.onClose}
          withBackground={true} />
        <div className={attachedClasses.join(' ')}>
          {this.props.children}
        </div>
      </Auxiliary>
    );
  }
}

export default Modal;