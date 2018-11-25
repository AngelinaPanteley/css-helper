import React from 'react';
import PropTypes from 'prop-types';
import styles from './Spinner.scss';

const spinner = () => (
  <div className={styles.Loader}>Loading...</div>
);

export default spinner;