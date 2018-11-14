import React, { Component } from 'react';
import { connect } from 'react-redux';

import SignForm from '../../components/SignForm/SignForm';
import * as actions from '../../store/actions/index';

class Login extends Component {
  render() {
    return (
      <SignForm isAuth={false} submit={this.props.login} />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(actions.auth(email, password)),
  }
}

export default connect(null, mapDispatchToProps)(Login);