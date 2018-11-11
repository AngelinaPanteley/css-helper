import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Dropdown.scss';
import Backdrop from '../Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

const dropdown = (props) => {
  const attachedClasses = [styles.Dropdown];
  if (props.isOpen) {
    attachedClasses.push(styles.Open);
  } else {
    attachedClasses.push(styles.Close);
  }
  if (props.left) {
    attachedClasses.push(styles.Left);
  }
  if (props.right) {
    attachedClasses.push(styles.Right);
  }
  return (
    <Auxiliary>
      <Backdrop show={props.isOpen} clicked={props.onClose} />
      <div className={attachedClasses.join(' ')}>
        <ul className={styles.List}>
          {
            props.links.map((link) => {
              return (
                <li key={link.route} className={styles.List_Item}>
                  <Link to={link.route} onClick={props.onClose}>
                    {link.title}
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    </Auxiliary>
  );
};

export default dropdown;