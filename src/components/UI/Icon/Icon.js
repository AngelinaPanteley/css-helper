import React from 'react';
import PropTypes from 'prop-types';
import styles from './Icon.scss';

const icon = (props) => {
  return (
    <i className={`${styles.icon} ${styles['icon_' + props.icon]}`} />
  )
}

export default icon;