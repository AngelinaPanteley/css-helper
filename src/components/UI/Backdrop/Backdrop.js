import React from 'react';
import PropTypes from 'prop-types';
import styles from './Backdrop.scss';

const backdrop = (props) => {
  const classes = [styles.Backdrop];
  if (props.withBackground) {
    classes.push(styles.With_Background);
  }
  return (
    props.show
      ? <div className={classes.join(' ')} onClick={props.clicked}></div>
      : null
  )
};

backdrop.propTypes = {
  withBackground: PropTypes.bool,
  clicked: PropTypes.func.isRequired,
}

export default backdrop;