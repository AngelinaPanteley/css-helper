import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Homepage.scss';

class Homepage extends Component {
  render() {
    return (
      <p>Homepage{this.props.editorNames}</p>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    editorNames: state.editors.names,
  }
}

export default connect(mapStateToProps)(Homepage);