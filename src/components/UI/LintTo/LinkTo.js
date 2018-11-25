import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './LinkTo.scss';

const link = (props) => {
  return (
    <Link to={props.route}
      className={styles.Link}
      onClick={props.onClick}>
      {props.children}
    </Link>
  )
}

link.propTypes = {
  route: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default link;