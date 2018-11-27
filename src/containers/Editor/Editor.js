import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Editor.scss';
import { calcStyles } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import Tabs from '../../components/UI/Tabs/Tabs';
import Generator from '../../components/Generator/Generator';
import Preview from '../../components/Preview/Preview';
import Code from '../../components/Code/Code';
import Examples from '../../components/Examples/Examples';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import SaveModal from '../../components/SaveModal/SaveModal';

class Editor extends PureComponent {
  static propTypes = {
    settings: PropTypes.shape({
      controls: PropTypes.object.isRequired,
    }).isRequired,
    isAuth: PropTypes.bool.isRequired,
    userId: PropTypes.string,
    token: PropTypes.string,
    editingItemId: PropTypes.string,
    editingItemTitle: PropTypes.string,
    save: PropTypes.func.isRequired,
    saveEditedItem: PropTypes.func.isRequired,
    openHint: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    const controls = props.settings.controls;
    const initialControlValues = {};
    let controlValues = JSON.parse(localStorage.getItem(this.props.name));

    for (let name in controls) {
      const control = controls[name];
      initialControlValues[name] = control.initialValue;
    };

    if (!controlValues) {
      controlValues = { ...initialControlValues };
    }

    const styleValues = calcStyles(props.settings.style, controlValues, controls);
    const initialStyleValues = calcStyles(props.settings.style, initialControlValues, controls);

    this.state = {
      controlValues,
      initialControlValues,
      styleValues,
      initialStyleValues,
      isExamplesOpen: true,
      isModalOpen: false,
    }
  }

  componentWillUnmount() {
    localStorage.setItem(this.props.name, JSON.stringify(this.state.controlValues));
  }

  handleChange = (control, value) => {
    this.setState({
      controlValues: {
        ...this.state.controlValues,
        [control]: value,
      }
    });

    this.changeStyles();
  }

  changeStyles = () => {
    const settings = this.props.settings;

    this.setState((prevState) => {
      return {
        styleValues: calcStyles(settings.style, prevState.controlValues, settings.controls),
      }
    });
  }

  toggleExamples = (e) => {
    e.preventDefault();
    this.setState({
      isExamplesOpen: !this.state.isExamplesOpen,
    })
  }

  selectExample = (exampleName) => {
    const example = this.props.settings.examples[exampleName];

    this.setState({
      controlValues: {
        ...this.state.initialControlValues,
        ...example,
      }
    });
    this.changeStyles();
  }

  toggleSaveModal = (e) => {
    e.preventDefault();

    this.setState({
      isModalOpen: !this.state.isModalOpen,
    })
  }

  onSave = (title) => {
    const { userId, token } = this.props;
    this.props.save(title, this.props.name, this.state.controlValues, userId, token);
  }

  saveEdited = (e) => {
    e.preventDefault();
    const { userId, token } = this.props;
    this.props.saveEditedItem(
      this.props.editingItemId,
      this.props.editingItemTitle,
      this.props.name,
      this.state.controlValues,
      userId,
      token
    );
  }

  openCopyHint = () => {
    this.props.openHint('Copied.');
  }

  clearControlValues = () => {
    this.setState({
      styleValues: { ...this.state.initialStyleValues },
      controlValues: { ...this.state.initialControlValues },
    })
  }

  render() {
    const settings = this.props.settings;
    return (
      <Auxiliary>
        <div className={styles.Editor}>
          <div className={styles.PreviewContainer}>
            <Examples isOpen={this.state.isExamplesOpen}
              previewClass={settings.className}
              template={settings.template}
              examples={settings.examples}
              initialControlValues={this.state.initialControlValues}
              styles={settings.style}
              controls={settings.controls}
              selectExample={this.selectExample} />
            <a href="" onClick={this.toggleExamples} className={styles.ToggleLink}>
              {
                this.state.isExamplesOpen
                  ?
                  'Hide Examples'
                  :
                  'Show Examples'
              }
            </a>
            <div className={styles.Preview}>
              <Preview
                previewClass={settings.className}
                template={settings.template}
                styles={this.state.styleValues} />
            </div>
            {
              this.props.isAuth
                ?
                <div className={styles.ButtonContainer}>
                  {
                    this.props.editingItemId &&
                    <a href=""
                      className={styles.SaveButton}
                      onClick={this.saveEdited}>
                      Save
                      </a>
                  }
                  <a href=""
                    className={styles.SaveButton}
                    onClick={this.toggleSaveModal}>
                    Save {this.props.editingItemId && 'As'}
                  </a>
                </div>
                :
                <Link to='/login'
                  className={styles.SaveButton}>
                  Save
              </Link>
            }
          </div>
          <div className={styles.TabsContainer}>
            <Tabs tabs={['Generator', 'Code']}>
              <Generator
                controls={settings.controls}
                controlValues={this.state.controlValues}
                handleChange={this.handleChange}
                onClear={this.clearControlValues} />
              <Code
                previewClass={settings.className}
                template={settings.template}
                styles={this.state.styleValues}
                onCopy={this.openCopyHint} />
            </Tabs>
          </div>
        </div >
        <SaveModal
          isOpen={this.state.isModalOpen}
          onClose={this.toggleSaveModal}
          onSubmit={this.onSave}
        />
      </Auxiliary>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: !!state.auth.userId,
    userId: state.auth.userId,
    token: state.auth.token,
    editingItemId: state.editors.editingItemId,
    editingItemTitle: state.editors.editingItemTitle,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    save: (title, editorName, controlValues, userId, token) => {
      dispatch(actions.save(title, editorName, controlValues, userId, token));
    },
    saveEditedItem: (id, title, editorName, controlValues, userId, token) => {
      dispatch(actions.saveEditedItem(id, title, editorName, controlValues, userId, token));
    },
    openHint: (text) => {
      dispatch(actions.openHint(text));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);