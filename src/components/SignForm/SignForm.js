import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './SignForm.scss';

class SignForm extends Component {
  state = {
    email: '',
    password: '',
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  validateForm = () => {
    const isValid = true;
    return isValid;
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.submit(this.state.email, this.state.password);
  }

  render() {
    const linkTitle = this.props.isAuth ? 'Login' : 'Authorization';
    const linkRoute = this.props.isAuth ? '/login' : '/auth';
    const submitValue = this.props.isAuth ? 'Create Account' : 'Log In';

    return (
      <form className={styles.Form} onSubmit={this.onFormSubmit}>
        <div className={styles.Form_Item}>
          <input type='email'
            id='email'
            name='email'
            value={this.state.value}
            onChange={this.onInputChange} />
          <label for='email'>
            Enter Email:
          </label>
        </div>
        <div className={styles.Form_Item}>
          <input type='password'
            id='password'
            name='password'
            value={this.state.value}
            onChange={this.onInputChange} />
          <label for='password'>
            Enter Password:
          </label>
        </div>
        <div className={styles.Form_Buttons}>
          <Link to={linkRoute}>Switch to {linkTitle}</Link>
          <input type='submit' value={submitValue} />
        </div>
      </form>
    )
  }
}

export default SignForm;