import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './Auth.scss';
import * as actions from '../../store/actions/index';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
  state = {
    email: '',
    password: '',
    isPasswordValid: true,
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  validateForm = () => {
    let isValid = true;
    const pass = this.state.password;

    if (pass.length < 6 || pass.length > 12) {
      isValid = false;
      this.setState({ isPasswordValid: isValid });
    }

    return isValid;
  }

  onFormSubmit = (e) => {
    e.preventDefault();

    if (this.validateForm()) {
      this.props.auth(this.state.email, this.state.password, this.props.isAuth);
    }
  }

  render() {
    const linkTitle = this.props.isAuth ? 'Login' : 'Authorization';
    const linkRoute = this.props.isAuth ? '/login' : '/auth';
    const submitValue = this.props.isAuth ? 'Create Account' : 'Log In';

    return (
      <Auxiliary>
        {
          this.props.isLoading
            ?
            <Spinner />
            :
            <form className={styles.Form} onSubmit={this.onFormSubmit}>
              <div className={styles.Form_Item}>
                <input type='email'
                  id='email'
                  name='email'
                  value={this.state.value}
                  onChange={this.onInputChange}
                  required />
                <label htmlFor='email'>
                  Enter Email:
                </label>
              </div>
              <div className={styles.Form_Item}>
                <input type='password'
                  id='password'
                  name='password'
                  value={this.state.value}
                  onChange={this.onInputChange}
                  required />
                <label htmlFor='password'>
                  Enter Password:
                </label>
                {
                  !this.state.isPasswordValid &&
                  <span className={styles.Form_Error}>Password length must be more than 6 and less than 12 symbols.</span>
                }
              </div>
              <div className={styles.Form_Buttons}>
                <Link to={linkRoute}>Switch to {linkTitle}</Link>
                <input type='submit' value={submitValue} />
              </div>
            </form>
        }
      </Auxiliary>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (email, password, isAuth) => dispatch(actions.auth(email, password, isAuth)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);