import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Homepage.scss';

import Carousel from '../../components/UI/Carousel/Carousel';

class Homepage extends Component {
  render() {
    return (
      <Carousel />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    editorNames: state.editors.names,
  }
}

export default connect(mapStateToProps)(Homepage);