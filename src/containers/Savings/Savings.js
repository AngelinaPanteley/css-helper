import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Savings.scss';

class Savings extends Component {
  render() {
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    savings: null,
  }
}

export default connect(mapStateToProps)(Savings);