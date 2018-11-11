import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Logo.scss';
import logoImg from '../../assets/images/logo.png';

const logo = (props) => {
  return (
    <Link to='/' className={styles.Logo}>
      <img src={logoImg} alt="logo" className={styles.Logo_image} />
    </Link>
  )
}

export default logo;