import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Account.scss';

class Account extends Component {
  render() {
    return (
      <p>Account{this.props.editorNames}</p>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    editorNames: state.editors.names,
  }
}

export default connect(mapStateToProps)(Account);