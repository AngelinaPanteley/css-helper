import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Menu.scss';

class Menu extends Component {
  render() {
    return (
      <p>Menu{this.props.editorNames}</p>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    editorNames: state.editors.names,
  }
}

export default connect(mapStateToProps)(Menu);