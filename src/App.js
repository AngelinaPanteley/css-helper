import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import Spinner from './components/UI/Spinner/Spinner';

class App extends Component {
  componentDidMount() {
    this.props.initEditors();
  }

  render() {
    const editors = this.props.editors;
    const routes = 'App';
    return (
      <div className="App">
        {
          //editors
          //? routes
          //: <Spinner />
        }
        <Spinner />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    editors: state.editors.editors,
  }
}

const mapDispatchTopProps = dispatch => {
  return {
    initEditors: () => dispatch(actions.initEditors()),
  }
}

export default connect(mapStateToProps, mapDispatchTopProps)(App);
