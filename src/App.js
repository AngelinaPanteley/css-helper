import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import { Switch, Redirect, Route } from 'react-router-dom';
import Spinner from './components/UI/Spinner/Spinner';
import Homepage from './containers/Homepage/Homepage';
import Layout from './hoc/Layout/Layout';

class App extends Component {
  componentDidMount() {
    this.props.initEditors();
  }

  render() {
    const editorNames = this.props.editorNames;
    let routes = (
      <Switch>
        {/* <Route path="/auth" component={asyncAuth} /> */}
        <Route path="/" exact component={Homepage} />
        <Redirect to="/" />
      </Switch>
    );

    return (
      <div className="App">
        {
          editorNames
            ? <Layout>{routes}</Layout>
            : <Spinner />
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    editorNames: state.editors.names,
  }
}

const mapDispatchTopProps = dispatch => {
  return {
    initEditors: () => dispatch(actions.initEditors()),
  }
}

export default connect(mapStateToProps, mapDispatchTopProps)(App);
