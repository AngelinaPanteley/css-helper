import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Menu.scss';

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

export default connect(mapStateToProps)(Menu);