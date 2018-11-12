import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LinkTo.scss';

const link = (props) => {
  return (
    <Link to={props.route} className={styles.Link}>
      {props.children}
    </Link>
  )
}

export default link;