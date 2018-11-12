import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Homepage.scss';

import Carousel from '../../components/UI/Carousel/Carousel';

class Homepage extends Component {
  render() {
    const slides = this.props.editorNames.map((name) => {
      return {
        imageUrl: this.props.editors[name].image,
        route: '/' + name,
        title: 'Create New ' + name[0].toUpperCase() + name.slice(1),
      }
    });

    return (
      <Carousel slides={slides} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    editors: state.editors.settings,
    editorNames: state.editors.names,
  }
}

export default connect(mapStateToProps)(Homepage);