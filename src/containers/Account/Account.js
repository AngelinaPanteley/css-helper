import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './Account.scss';

import Icon from '../../components/UI/Icon/Icon';
import Dropdown from '../../components/UI/Dropdown/Dropdown';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

class Account extends Component {
  state = {
    isDropdownOpen: false,
  }

  onAccountClick = (e) => {
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
    const links = [
      {
        title: 'Log In',
        route: '/auth',
      },
      {
        title: 'Create Account',
        route: '/auth',
      }
    ];

    return (
      <Auxiliary>
        <div className={styles.Account}>
          {
            links.map((link) => {
              return (
                <span className={styles.Account_Link_Wrapper}>
                  <Link to={link.route} className={styles.Account_Link}>
                    {link.title}
                  </Link>
                </span>
              )
            })
          }
        </div>
        <div className={styles.Account_Mobile}>
          <a href="" onClick={this.onAccountClick}>
            <Icon icon='account' />
          </a>
          {
            <Dropdown isOpen={this.state.isDropdownOpen}
              links={links} right
              onClose={this.toggleDropdown} />
          }
        </div>
      </Auxiliary>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    editorNames: state.editors.names,
  }
}

export default connect(mapStateToProps)(Account);