import React from 'react';
import PropTypes from 'prop-types';
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
                <li key={link.title} className={styles.List_Item}>
                  {
                    link.route
                      ?
                      <Link to={link.route}
                        onClick={() => {
                          props.onClose();
                          if (props.onClick) {
                            props.onClick();
                          }
                        }}>
                        {link.title}
                      </Link>
                      :
                      <a onClick={(e) => {
                        e.preventDefault();
                        props.onClose();
                        if (props.onClick) {
                          props.onClick();
                        }
                        link.click();
                      }}>
                        {link.title}
                      </a>
                  }
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