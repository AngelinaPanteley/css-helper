import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import styles from './Account.scss';

import Icon from '../../components/UI/Icon/Icon';
import Dropdown from '../../components/UI/Dropdown/Dropdown';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import * as actions from '../../store/actions/index';

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
    let links = [
      {
        title: 'Log In',
        route: '/login',
      },
      {
        title: 'Create Account',
        route: '/auth',
      }
    ];

    if (this.props.isAuth) {
      let showBy = localStorage.getItem('showBy');
      if (!showBy) {
        showBy = 5;
      }
      links = [
        {
          title: 'My Savings',
          route: `/savings/${showBy}/1`,
        },
        {
          title: 'Logout',
          route: '',
          click: this.props.onLogout,
        }
      ];
    }

    return (
      <Auxiliary>
        <div className={styles.Account}>
          {
            links.map((link) => {
              return (
                <span className={styles.Account_Link_Wrapper} key={link.route}>
                  <Auxiliary>
                    {
                      link.route
                        ?
                        <Link to={link.route}
                          className={styles.Account_Link}
                          onClick={link.click}>
                          {link.title}
                        </Link>
                        :
                        <a className={styles.Account_Link}
                          onClick={(e) => {
                            e.preventDefault();
                            link.click()
                          }}>
                          {link.title}
                        </a>
                    }
                  </Auxiliary>
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
    isAuth: !!state.auth.userId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Account));