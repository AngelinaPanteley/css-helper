import React, { Component } from 'react';
import { connect } from 'react-redux';

import SignForm from '../../components/SignForm/SignForm';

class Login extends Component {
  render() {
    return (
      <SignForm isAuth={false} submit={this.props.login} />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => { console.log('login') },
  }
}

export default connect(null, mapDispatchToProps)(Login);