import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { Switch, Redirect, Route, withRouter } from 'react-router-dom';
import styles from './App.scss';
import Spinner from '../../components/UI/Spinner/Spinner';
import Homepage from '../Homepage/Homepage';
import Layout from '../../hoc/Layout/Layout';
import Auth from '../Auth/Auth';

class App extends Component {
  componentDidMount() {
    this.props.initEditors();
  }

  render() {
    const editorNames = this.props.editorNames;
    let routes = (
      <Switch>
        <Route path="/login" component={Auth} />
        <Route path="/auth" render={() => <Auth isAuth />} />
        <Route path="/" exact component={Homepage} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div className={styles.App}>
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
    isAuth: !!state.auth.userId,
  }
}

const mapDispatchTopProps = dispatch => {
  return {
    initEditors: () => dispatch(actions.initEditors()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchTopProps)(App));
