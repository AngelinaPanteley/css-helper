import React from 'react';

import styles from './Header.scss'

import Logo from '../Logo/Logo';
import Menu from '../../containers/Menu/Menu';
import Account from '../../containers/Account/Account';

const header = (props) => {
  return (
    <div className={styles.Header} >
      <Menu />
      <Logo />
      <Account />
    </div>
  );
}

export default header;