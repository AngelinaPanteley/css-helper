import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Menu.scss';
import * as actions from '../../store/actions/index';
import Icon from '../../components/UI/Icon/Icon';
import Dropdown from '../../components/UI/Dropdown/Dropdown';

class Menu extends Component {
  state = {
    isDropdownOpen: false,
  }

  onMenuClick = (e) => {
    e.preventDefault();
    this.toggleDropdown();
  }

  toggleDropdown = () => {
    this.setState(prevState => {
      return {
        isDropdownOpen: !prevState.isDropdownOpen
      }
    });
  }

  render() {
    const links = this.props.editorNames.map((elem) => {
      return {
        title: 'Create ' + elem[0].toUpperCase() + elem.slice(1),
        route: '/' + elem,
      }
    });

    return (
      <div className={styles.Menu}>
        <a href="" onClick={this.onMenuClick}>
          <Icon icon='menu' />
        </a>
        {
          <Dropdown isOpen={this.state.isDropdownOpen}
            links={links} left
            onClick={this.props.turnEditingModeOff}
            onClose={this.toggleDropdown} />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    editorNames: state.editors.names,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    turnEditingModeOff: () => dispatch(actions.turnEditingModeOff()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);