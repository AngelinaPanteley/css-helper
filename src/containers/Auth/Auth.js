import React, { Component } from 'react';
import { connect } from 'react-redux';

import SignForm from '../../components/SignForm/SignForm';

class Auth extends Component {
  render() {
    return (
      <SignForm isAuth={true} submit={this.props.createAccount} />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createAccount: () => { console.log('create account') },
  }
}

export default connect(null, mapDispatchToProps)(Auth);