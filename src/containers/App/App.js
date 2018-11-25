import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { Switch, Redirect, Route, withRouter } from 'react-router-dom';
import styles from './App.scss';
import Spinner from '../../components/UI/Spinner/Spinner';
import Homepage from '../Homepage/Homepage';
import Layout from '../../hoc/Layout/Layout';
import Auth from '../Auth/Auth';
import Editor from '../Editor/Editor';
import Savings from '../Savings/Savings';
import Hint from '../../components/UI/Hint/Hint';

class App extends Component {
  componentDidMount() {
    this.props.initEditors();
    this.props.initUser();
  }

  render() {
    const editorNames = this.props.editorNames;
    let editorRoutes = null;

    if (editorNames) {

      editorRoutes = this.props.editorNames.map((name) => {
        const settings = this.props.editorSettings[name];
        return (
          <Route path={`/${name}`} key={name} render={() => {
            return <Editor
              name={name}
              settings={settings} />
          }} />
        )
      });
    }

    let routes = (
      <Switch>
        <Route path="/login" component={Auth} />
        <Route path="/auth" render={() => <Auth isAuth />} />
        {editorRoutes}
        <Route path="/" exact component={Homepage} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/savings/:showBy/:pageNumber/:itemId?" component={Savings} />
          {editorRoutes}
          <Route path="/" exact component={Homepage} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div className={styles.App}>
        {
          editorNames
            ?
            <Layout>
              {routes}
            </Layout>
            : <Spinner />
        }
        <Hint
          isOpen={this.props.isHintOpen}
          isError={this.props.isHintError}
          entryText={this.props.hintText}
          onClose={this.props.closeHint}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    editorNames: state.editors.names,
    editorSettings: state.editors.settings,
    isAuth: !!state.auth.userId,
    isHintOpen: state.hint.isOpen,
    isHintError: state.hint.isError,
    hintText: state.hint.text,
  }
}

const mapDispatchTopProps = dispatch => {
  return {
    initEditors: () => dispatch(actions.initEditors()),
    initUser: () => dispatch(actions.authInit()),
    closeHint: () => dispatch(actions.closeHint()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchTopProps)(App));
