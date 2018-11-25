import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Carousel from '../../components/UI/Carousel/Carousel';
import * as actions from '../../store/actions/index';

class Homepage extends PureComponent {
  static propTypes = {
    editors: PropTypes.object.isRequired,
    editorNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    turnEditingModeOff: PropTypes.func.isRequired,
  }

  render() {
    const slides = this.props.editorNames.map((name) => {
      return {
        imageUrl: this.props.editors[name].image,
        route: '/' + name,
        title: 'Create New ' + name[0].toUpperCase() + name.slice(1),
      }
    });

    return (
      <Carousel slides={slides} onClick={this.props.turnEditingModeOff} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    editors: state.editors.settings,
    editorNames: state.editors.names,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    turnEditingModeOff: () => dispatch(actions.turnEditingModeOff()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);